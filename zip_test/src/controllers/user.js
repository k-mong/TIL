import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const profile = async (req, res, next) => {
  try {
      const nick = await prisma.user.findFirst({ where: {nick: req.user.nick}});
      if (!nick) {
          await prisma.user.update({nick: req.body.nick, img: req.body.img}, {
              where: {id: req.user.id},
          });
          res.status(200).send('사용가능한 닉네임 입니다.')
      } else {
          res.status(404).send('다른 사용자가 닉네임을 사용중 입니다.');
      }
  } catch (error) {
      res.status(500).json({ error: '서버오류발생' });
      next(error);
  }
};