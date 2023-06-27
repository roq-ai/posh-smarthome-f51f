import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { energyUsageValidationSchema } from 'validationSchema/energy-usages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.energy_usage
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEnergyUsageById();
    case 'PUT':
      return updateEnergyUsageById();
    case 'DELETE':
      return deleteEnergyUsageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEnergyUsageById() {
    const data = await prisma.energy_usage.findFirst(convertQueryToPrismaUtil(req.query, 'energy_usage'));
    return res.status(200).json(data);
  }

  async function updateEnergyUsageById() {
    await energyUsageValidationSchema.validate(req.body);
    const data = await prisma.energy_usage.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEnergyUsageById() {
    const data = await prisma.energy_usage.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
