import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { poshSmartHomeValidationSchema } from 'validationSchema/posh-smart-homes';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPoshSmartHomes();
    case 'POST':
      return createPoshSmartHome();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPoshSmartHomes() {
    const data = await prisma.posh_smart_home
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'posh_smart_home'));
    return res.status(200).json(data);
  }

  async function createPoshSmartHome() {
    await poshSmartHomeValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.forum?.length > 0) {
      const create_forum = body.forum;
      body.forum = {
        create: create_forum,
      };
    } else {
      delete body.forum;
    }
    if (body?.project?.length > 0) {
      const create_project = body.project;
      body.project = {
        create: create_project,
      };
    } else {
      delete body.project;
    }
    const data = await prisma.posh_smart_home.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
