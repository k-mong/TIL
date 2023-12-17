/*
  Warnings:

  - You are about to drop the column `addressId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Board` DROP FOREIGN KEY `Board_addressId_fkey`;

-- AlterTable
ALTER TABLE `Board` DROP COLUMN `addressId`,
    ADD COLUMN `address` MEDIUMTEXT NOT NULL,
    ALTER COLUMN `elevator` DROP DEFAULT,
    ALTER COLUMN `parking` DROP DEFAULT;

-- DropTable
DROP TABLE `Address`;
