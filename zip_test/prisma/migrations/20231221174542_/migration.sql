/*
  Warnings:

  - Added the required column `allfloor` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Board` ADD COLUMN `allfloor` INTEGER NOT NULL,
    ADD COLUMN `hopeDate` DATETIME(3) NULL,
    ADD COLUMN `parkingValue` INTEGER NULL;
