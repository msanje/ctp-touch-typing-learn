/*
  Warnings:

  - You are about to drop the column `wpm` on the `Progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `wpm`,
    ADD COLUMN `speed` BOOLEAN NULL;
