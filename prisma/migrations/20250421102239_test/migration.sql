/*
  Warnings:

  - You are about to drop the column `acccuracy` on the `Progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `acccuracy`,
    ADD COLUMN `accuracy` BOOLEAN NULL;
