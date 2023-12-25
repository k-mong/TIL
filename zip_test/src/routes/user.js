import { Router } from "express";

import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
//import { profile } from "../controllers/user.js"

const router = Router();

//router.post('/profile', isLoggedIn, profile);

export default router;