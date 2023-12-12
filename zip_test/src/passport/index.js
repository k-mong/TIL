import passport from "passport";
import local from './localStrategy.js';
import kakao from './kakaoStrategy.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function passportConfig() {
    passport.serializeUser((user, done) => {
        console.log("serializeUser 실행", user);
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        console.log('deserialize');
    
        try {
            const user = await prisma.user.findFirst({
                where: { id },
            });
            console.log('user', user);
            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
    local();
    kakao();
};


export default passportConfig;