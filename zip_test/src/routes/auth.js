import { Router } from "express";
import passport from "passport";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isNotLoggedIn } from "../middlewares/isNotLoggedIn.js";
import { join, login, logout, test } from "../controllers/auth.js"


const router = Router();

router.post("/join", isNotLoggedIn, join);

router.post("/login", isNotLoggedIn, login);

router.get("/logout", isLoggedIn, logout);

router.get("/kakao", passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/?error=카카오로그인 실패',
}), (req, res) => {
  res.redirect('/'); // 성공 시에는 /로 이동
});

router.get('/test', test);
export default router;