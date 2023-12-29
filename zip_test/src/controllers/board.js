import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const afterUploadImage = (req, res) => {
    console.log("req.file = ", req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

// 게시글 등록
export const uploadBoard = async(req, res, next) => {
    try {
        const { size, address, addressDetail, pyeong, style, paied, monthPay, deposit, maintenance, allfloor, floor, elevator, parking, parkingValue, title, content } = req.body;
        const images = Array.isArray(req.body.url) ? req.body.url.map((image) => ({ name: image })) : [];

        const board = await prisma.board.create({
            data: {
                size,           // 원룸 투룸
                address,        // 주소
                addressDetail,  // 상세주소
                pyeong,         // 평수
                style,          // 오픈형, 분리형, 복층형
                paied,          // 월세 전세
                monthPay,       // 월세
                deposit,        // 보증금
                hopeDate,       // 입주가능날짜
                maintenance,    // 관리비
                allfloor,       // 전체 층 수
                floor,          // 층수
                elevator,       // 엘리베이터 유무
                parking,        // 주차유무
                parkingValue,   // 주차비
                title,          // 게시글 제목
                content,        // 게시글 내용
                img: images,    // 이미지
                UserId: req.user.id,
            },
            
            
        });
        console.log(board);
        res.status(200).json(board);
    } catch (error) {
        res.status(400).json('게시글을 업로드 할 수 없습니다.');
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
        //const date = new Date(req.body.hopeDate);
        if(board) {
            await prisma.board.update({
                where: { id: board.id },
                data: {
                    monthPay: req.body.monthPay,
                    deposit: req.body.deposit,
                    maintenance: req.body.maintenance,
                    hopeDate: req.body.hopeDate,
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

export const Like = async(req, res, next) => {
    try {
        const board = await prisma.board.findFirst({ where: { id: req.params.id }});

        if(!board){
            return res.status(404).send('없는 게시글 입니다.');
        }

        await prisma.board.update({
            where: { id: board.id },
            data: {
                likes: {
                    connect: { id: req.user.id }
                }
            }
        });
        res.send('좋아요');
    } catch(error) {
        console.log(error);
        next(error);
    }
};

export const unLike = async(req, res, next) => {
    try {
        const board = await prisma.board.findFirst({ where: { id: req.params.id }});

        if(!board){
            return res.status(404).send('없는 게시글 입니다.');
        }

        await prisma.board.update({
            where: { id: board.id },
            data: {
                likes: {
                    disconnect: { id: req.user.id }
                }
            }
        });
        res.send('좋아요 취소');
    } catch (error) {
        console.log(error);
        next(error);
    }
};