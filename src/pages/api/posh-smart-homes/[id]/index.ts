import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { poshSmartHomeValidationSchema } from 'validationSchema/posh-smart-homes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.posh_smart_home
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPoshSmartHomeById();
    case 'PUT':
      return updatePoshSmartHomeById();
    case 'DELETE':
      return deletePoshSmartHomeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPoshSmartHomeById() {
    const data = await prisma.posh_smart_home.findFirst(convertQueryToPrismaUtil(req.query, 'posh_smart_home'));
    return res.status(200).json(data);
  }

  async function updatePoshSmartHomeById() {
    await poshSmartHomeValidationSchema.validate(req.body);
    const data = await prisma.posh_smart_home.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deletePoshSmartHomeById() {
    const data = await prisma.posh_smart_home.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
