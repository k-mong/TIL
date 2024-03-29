import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const join = async (req, res, next) => {
    console.log('join함수 실행');
    const { email, password, confirmPW } = req.body;
    const provider = req.body.provider || "LOCAL";

    
    try {
        console.log(password, confirmPW);
        if (password !== confirmPW) {
            return res.status(400).json({ error: '비밀번호가 일치하지 않습니다' });
        }
        const user = await prisma.user.findFirst({ 
            where: {
                OR: [
                    { email },
                ],
            },
            
        });
        console.log(user);
        if(user) {
            return res.status(400).json({ error: '이미 존재하는 사용자 입니다' });
        }
        const hash = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data: {
                email,
                nickname: req.body.email,
                password: hash,
                confirmPW: hash,
                provider,
                img: "",
            },
        });

        res.status(200).json('회원가입 완료');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버오류발생'});
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
            return res.status(400).redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
          if (loginError) {
            console.error(loginError);
            return next(loginError);
          }
           res.cookie('user_id', user.id, { httpOnly: true });
   
           res.status(200).json(user);
           //res.redirect('/');
        });
      })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
};

export const logout = (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.status(200).json('로그아웃 완료');
    });
};

export const test = (req, res) => {
    res.send('테스트');
};
