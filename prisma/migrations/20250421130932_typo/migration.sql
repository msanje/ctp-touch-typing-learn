/*
  Warnings:

  - You are about to drop the column `lessThanTwoTypos` on the `Progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `lessThanTwoTypos`,
    ADD COLUMN `lessThenTwoTypos` BOOLEAN NULL;
