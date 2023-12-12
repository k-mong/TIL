-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `nickname` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `provider` ENUM('LOCAL', 'KAKAO') NULL,
    `img` VARCHAR(400) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Board` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `size` BOOLEAN NOT NULL,
    `address` MEDIUMTEXT NOT NULL,
    `pyeong` INTEGER NOT NULL,
    `style` ENUM('OPEN', 'DETACHABLE', 'LAYERD') NOT NULL,
    `paied` BOOLEAN NOT NULL,
    `deposit` INTEGER NOT NULL,
    `monthPay` INTEGER NOT NULL,
    `maintenance` BOOLEAN NOT NULL DEFAULT false,
    `maintenanceValue` INTEGER NOT NULL,
    `floor` INTEGER NOT NULL,
    `elevator` BOOLEAN NOT NULL,
    `parking` BOOLEAN NOT NULL,
    `valueForOption` ENUM('ARECON', 'DESK') NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `seq` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `boardId` INTEGER NOT NULL,

    PRIMARY KEY (`seq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`seq`) ON DELETE RESTRICT ON UPDATE CASCADE;
