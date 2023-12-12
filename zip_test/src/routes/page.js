import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import { renderProfile, renderJoin } from "../controllers/page.js";

const router = Router();

router.get('/join', isNotLoggedIn, renderJoin);

export default router;