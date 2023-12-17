/*
  Warnings:

  - You are about to drop the column `maintenanceValue` on the `Board` table. All the data in the column will be lost.
  - Added the required column `addressDetail` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Board` DROP COLUMN `maintenanceValue`,
    ADD COLUMN `addressDetail` VARCHAR(200) NOT NULL,
    MODIFY `maintenance` INTEGER NULL,
    MODIFY `valueForOption` ENUM('ARECON', 'DESK') NULL,
    MODIFY `address` VARCHAR(200) NOT NULL;
