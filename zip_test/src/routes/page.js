import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import { renderProfile, renderJoin, boardDetail, boardList, search } from "../controllers/page.js";

const router = Router();

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/boardList', boardList);

router.get('/boardDetail/:seq', boardDetail);

router.get('/searchBoard', search);

export default router;