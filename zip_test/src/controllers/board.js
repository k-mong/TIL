import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const afterUploadImage = (req, res) => {
    console.log("req.file = ", req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

// 게시글 등록
export const uploadBoard = async(req, res, next) => {
    try {
        const boardAddress = await prisma.address.findFirst({
            where : {
                sido: req.body.sido,
                gugun: req.body.gugun,
                dong: req.body.dong,
                bunji: req.body.bunji,
            }
        });
        if (!boardAddress) {
            return res.status(404).send('주소를 찾을 수 없습니다.');
        }
        const { size, address, pyeong, style, paied, monthPay, deposit, maintenance, floor, elevator, parking, options, title, content, img } = req.body;
        const images = Array.isArray(img) ? img.map((image) => ({ name: image })) : [];
        const board = await prisma.board.create({
            size,
            address: {
                connect: {
                    id: boardAddress.id,
                },
            },
            pyeong,
            style,
            paied,
            monthPay,
            deposit,
            maintenance,
            floor,
            elevator,
            parking,
            options,
            title,
            content,
            images,
            UserId: req.user.id,
        });
        res.send('게시글등록 성공');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// 게시글 삭제
export const deleteBoard = async (req, res, next) => {
    try {
       await prisma.board.destroy({ where: {id: req.params.id, userId: req.user.id }});
       res.send('게시글을 삭제했습니다.');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 게시글 수정
export const updateBoard = async (req, res, next) => {
    try {
        const board = await prisma.board.findFirst({ where: {id: req.params.id, userId: req.user.id }});
        if(board) {
            await prisma.board.update({
                where: { id: board.id },
                data: {
                    monthPay: req.body.monthPay,
                    deposit: req.body.deposit,
                    maintenance: req.body.maintenance,
                    moveDate: req.body.moveDate,
                    title: req.body.title,
                    content: req.body.content,
                },
            });
            res.send('게시글이 수정됐습니다.');
        } else {
            res.status(404).send('게시글이 존재하지 않습니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};