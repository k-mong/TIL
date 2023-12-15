import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import { renderProfile, renderJoin, boardDetail, boardList } from "../controllers/page.js";

const router = Router();

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/boardList', boardList);

router.get('/boardDetail', boardDetail);

export default router;