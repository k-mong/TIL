/*
  Warnings:

  - You are about to alter the column `size` on the `Board` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.
  - The values [OPEN,DETACHABLE,LAYERD] on the enum `Board_style` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `paied` on the `Board` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(3))`.
  - Made the column `maintenance` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Board` ADD COLUMN `maintenanceValue` INTEGER NULL,
    MODIFY `size` ENUM('one', 'two') NOT NULL,
    MODIFY `style` ENUM('open', 'detachable', 'layerd') NOT NULL,
    MODIFY `paied` ENUM('month', 'year') NOT NULL,
    MODIFY `maintenance` BOOLEAN NOT NULL;
