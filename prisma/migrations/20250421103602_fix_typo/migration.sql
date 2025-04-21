/*
  Warnings:

  - You are about to drop the column `lessThenTwoTypos` on the `Progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `lessThenTwoTypos`,
    ADD COLUMN `lessThanTwoTypos` BOOLEAN NULL;
