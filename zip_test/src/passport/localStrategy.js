import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function local() {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false,
}, async (email, password, done) => {
    try {
        console.log("데이터에 email 이 있는지 찾기");
        const user = await prisma.user.findFirst({ where: { email } });
        console.log("user = ", user);
        if (user) {
           const result = await bcrypt.compare(password, user.password);
           console.log("result = ", result);
           if (result) {
            done(null, user);
          } else {
            done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          }
        } else {
          done(null, false, { message: '가입되지 않은 회원입니다.' });
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
}));
};


export default local;