import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - zipzoong'});
};

export const renderJoin = (req, res) => {
    res.render('join', {title: '회원가입 - zipzoog'});
};

export const boardList = async (req, res, next) => {
    try{
        console.log('게시글목록 출력');
        const boards = await prisma.board.findMany({
            select: {
                seq: true,
                title: true,
                deposit: true,
                month: true,
                floorsNumber: true,
                address: true,
                roomArea: true,
                roomImage: true
            },
            orderBy: {
                createdAt: "desc"
            },
        });
        if(boards.length === 0){
            res.status(404).json('게시글목록을 불러올 수 없습니다.')
        }
        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 게시글 상세보가
export const boardDetail = async (req, res, next) => {
    try {
        const seqId = parseInt(req.params.seq, 10);
        const board = await prisma.board.findUnique({ 
            where: {seq: seqId},
            include: {
                roomImage: true, 
            },
        });
        if (!board) {
            // 게시글이 없는 경우 예외 처리
            return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
        }
        res.status(200).json(board);
    } catch(error) {
        res.status(500).json({ error: '서버 오류' });
        next(error);
    }
};

// 게시글 검색
export const search = async (req, res, next) => {
    const query = req.query.search;
    if(!query) {
        return res.status(404).json({ error: '게시글이 없습니다.' });
    }
    try {
        let boards = [];
            boards = await prisma.board.findMany({
                where: { address: query },
                //select: ['title', 'deposit', 'month', 'floorNumber', 'address', 'roomArea'],
                select: {
                    title: true,
                    deposit: true,
                    month: true,
                    floorsNumber: true,
                    address: true,
                    roomArea: true,
                    roomImage: true
                },
                orderBy: {
                    createdAt: "desc"
                },
            });
            res.status(200).json(boards);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: '서버 오류발생' });
        next(error);
    }
};