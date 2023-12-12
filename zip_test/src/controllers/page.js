import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - zipzoong'});
};

export const renderJoin = (req, res) => {
    res.render('join', {title: '회원가입 - zipzoog'});
};