import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const afterUploadImage = (req, res) => {
    console.log("req.file = ", req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

// 게시글 등록
export const uploadBoard = async(req, res, next) => {
    console.log('게시글 등록 시작!');
    try {
        const { roomType, address, addressDetail, roomArea, roomInfo, rentType, month, deposit, cost, roomCost, selectDate, datePicker, totalfloor, floorsNumber, elevator, parking, parkingCost, title, textArea } = req.body;
        const images = Array.isArray(req.body.url) ? req.body.url.map((image) => ({ name: image })) : [];

        const board = await prisma.board.create({
            data: {
                roomType,           // 원룸 투룸
                address,        // 주소
                addressDetail,  // 상세주소
                roomArea,         // 평수
                roomInfo,          // 오픈형, 분리형, 복층형

                rentType,          // 월세 전세
                deposit,        // 보증금
                month,       // 월세
                cost,    // 유무
                roomCost,   // 관리비

                selectDate,
                datePicker,       // 입주가능날짜

                totalfloor,       // 전체 층 수
                floorsNumber,          // 층수

                elevator,       // 엘리베이터 유무
                parking,        // 주차유무
                parkingCost,   // 주차비
                
                roomImage: images,

                title,          // 게시글 제목
                textArea,        // 게시글 내용

                user: {
                    connect: { id: req.user.id }
                },
            },
            
            
        });
        console.log(board);
        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        res.status(400).json('게시글을 업로드 할 수 없습니다.');
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