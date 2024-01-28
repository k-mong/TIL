-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_boardId_fkey`;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`seq`) ON DELETE CASCADE ON UPDATE CASCADE;
