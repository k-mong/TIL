import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const profile = async (req, res, next) => {
    try {
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          nick: req.body.nick,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
};