/*
  Warnings:

  - You are about to drop the column `valueForOption` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Board` DROP COLUMN `valueForOption`,
    ADD COLUMN `Option` ENUM('ARECON', 'DESK') NULL;
