import passport from "passport";
import { Strategy as kakaoStrategy } from 'passport-kakao';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function kakao() {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
    
        try {
            const user = await prisma.user.findUnique({
                where: { snsId: profile.id, provider: 'kakao' },
            });
            if (user) {
              done( null, user );  
            } else {
                const newUser = await prisma.user.create({
                    email: profile._json?.kakao_account?.email,
                    nickName: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done( null, newUser );
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
    
}
export default kakao;