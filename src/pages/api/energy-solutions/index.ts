import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { energySolutionValidationSchema } from 'validationSchema/energy-solutions';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEnergySolutions();
    case 'POST':
      return createEnergySolution();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEnergySolutions() {
    const data = await prisma.energy_solution
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'energy_solution'));
    return res.status(200).json(data);
  }

  async function createEnergySolution() {
    await energySolutionValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.energy_solution.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
