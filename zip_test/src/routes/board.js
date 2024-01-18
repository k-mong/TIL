import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import { uploadBoard, deleteBoard, updateBoard, afterUploadImage } from "../controllers/board.js";
import { Like, unLike } from "../controllers/board.js";

const router = Router();

try{
    fs.readdirSync('uploads');   // 'uploads' 라는 폴더가 있는지
} catch(error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 없으면 'uploads'라는 폴더를 만들어줘
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/')    // uploads 폴더에다 저장하겠다
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024},
});

router.post('/img', isLoggedIn, upload.array('img', 10), afterUploadImage)

const upload2 = multer();
router.post('/uploadBoard', isLoggedIn, upload.array('img', 10), uploadBoard);

router.post('/:id/updateBoard', isLoggedIn, updateBoard);

router.delete('/:id/deleteBoard', deleteBoard);

router.post('/:id/Like', Like);

router.delete('/:id/unLike', unLike);

export default router;