import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const join = async (req, res, next) => {
    console.log('join함수 실행');
    const { email, nickname, password } = req.body;
    const provider = req.body.provider || "LOCAL";
    try {
        const user = await prisma.user.findFirst({ 
            where: {
                OR: [
                    { email },
                    { nickname },
                ],
            },
            
        });
        console.log(user);
        if(user) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data: {
                email,
                nickname,
                password: hash,
                provider,
                img: "",
            },
        });
        console.log(prisma.user);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

export const login = (req, res, next) => {
    console.log('login 함수 실행');
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
          console.error(authError);
          return next(authError);
        }
        if (!user) {
          return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
          if (loginError) {
            console.error(loginError);
            return next(loginError);
          }
        });
      })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
};

export const logout = (req, res) => {
    req.logout(() => {
        req.session.destroy();
    });
};
