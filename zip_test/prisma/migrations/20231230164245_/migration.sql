/*
  Warnings:

  - You are about to drop the column `allfloor` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `floor` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `hopeDate` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `maintenance` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `maintenanceValue` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `monthPay` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `paied` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `parkingValue` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `pyeong` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Board` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorsNumber` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentType` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomArea` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomInfo` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectDate` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testArea` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalfloor` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Board` DROP COLUMN `allfloor`,
    DROP COLUMN `content`,
    DROP COLUMN `floor`,
    DROP COLUMN `hopeDate`,
    DROP COLUMN `maintenance`,
    DROP COLUMN `maintenanceValue`,
    DROP COLUMN `monthPay`,
    DROP COLUMN `paied`,
    DROP COLUMN `parkingValue`,
    DROP COLUMN `pyeong`,
    DROP COLUMN `size`,
    DROP COLUMN `style`,
    ADD COLUMN `cost` BOOLEAN NOT NULL,
    ADD COLUMN `datePicker` DATETIME(3) NULL,
    ADD COLUMN `floorsNumber` INTEGER NOT NULL,
    ADD COLUMN `month` INTEGER NOT NULL,
    ADD COLUMN `parkingCost` INTEGER NULL,
    ADD COLUMN `rentType` ENUM('month', 'year') NOT NULL,
    ADD COLUMN `roomArea` INTEGER NOT NULL,
    ADD COLUMN `roomCost` INTEGER NULL,
    ADD COLUMN `roomInfo` ENUM('open', 'detachable', 'layerd') NOT NULL,
    ADD COLUMN `roomType` ENUM('one', 'two') NOT NULL,
    ADD COLUMN `selectDate` BOOLEAN NOT NULL,
    ADD COLUMN `testArea` LONGTEXT NOT NULL,
    ADD COLUMN `totalfloor` INTEGER NOT NULL;
