/*
  Warnings:

  - You are about to drop the column `accuracy` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `lessThanTwoTypos` on the `Progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Certificate` ADD COLUMN `isCompleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `accuracy`,
    DROP COLUMN `lessThanTwoTypos`,
    ADD COLUMN `acccuracy` BOOLEAN NULL,
    ADD COLUMN `lessThenTwoTypos` BOOLEAN NULL;
