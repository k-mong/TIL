/*
  Warnings:

  - You are about to drop the column `address` on the `Board` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Board` DROP COLUMN `address`,
    ADD COLUMN `addressId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `boardId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `zipNum` VARCHAR(200) NOT NULL,
    `sido` VARCHAR(200) NOT NULL,
    `gugun` VARCHAR(200) NOT NULL,
    `dong` VARCHAR(200) NOT NULL,
    `zipcode` VARCHAR(200) NOT NULL,
    `bunji` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`seq`) ON DELETE RESTRICT ON UPDATE CASCADE;
