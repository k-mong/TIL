/*
  Warnings:

  - You are about to drop the column `testArea` on the `Board` table. All the data in the column will be lost.
  - Added the required column `textArea` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Board` DROP COLUMN `testArea`,
    ADD COLUMN `textArea` LONGTEXT NOT NULL,
    MODIFY `floorsNumber` VARCHAR(20) NOT NULL,
    MODIFY `totalfloor` VARCHAR(20) NOT NULL;
