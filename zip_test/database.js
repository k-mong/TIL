import { PrismaClient } from '@prisma/client';

function database() {
    const prisma = new PrismaClient();

(async () => {

    try {
        await prisma.$connect();
        console.log('데이터베이스 연결');
    } catch (err) {
        console.error('데이터베이스 연결 실패', err);
    }
})();
}



export default database;