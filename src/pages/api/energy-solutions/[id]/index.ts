import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { energySolutionValidationSchema } from 'validationSchema/energy-solutions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.energy_solution
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEnergySolutionById();
    case 'PUT':
      return updateEnergySolutionById();
    case 'DELETE':
      return deleteEnergySolutionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEnergySolutionById() {
    const data = await prisma.energy_solution.findFirst(convertQueryToPrismaUtil(req.query, 'energy_solution'));
    return res.status(200).json(data);
  }

  async function updateEnergySolutionById() {
    await energySolutionValidationSchema.validate(req.body);
    const data = await prisma.energy_solution.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEnergySolutionById() {
    const data = await prisma.energy_solution.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
