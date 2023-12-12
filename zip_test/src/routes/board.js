import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/index.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import { uploadBoard, deleteBoard, updateBoard } from "../controllers/board.js";

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

router.post('/uploadBoard', upload.array('files', 10), uploadBoard)

router.post('/:id/update', isLoggedIn, updateBoard);

router.delete('/:id/delete', isLoggedIn, deleteBoard);

export default router;