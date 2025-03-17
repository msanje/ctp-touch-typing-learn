/*
  Warnings:

  - You are about to drop the column `index` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseIndex` on the `Progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonId,exerciseIndex]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exerciseIndex` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_userId_fkey`;

-- DropIndex
DROP INDEX `Progress_userId_lessonId_key` ON `Progress`;

-- AlterTable
ALTER TABLE `Exercise` DROP COLUMN `index`,
    ADD COLUMN `exerciseIndex` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `exerciseIndex`,
    ADD COLUMN `accuracy` DOUBLE NULL,
    ADD COLUMN `exerciseId` INTEGER NOT NULL,
    ADD COLUMN `lessThanTwoTypos` BOOLEAN NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `wpm` INTEGER NULL;

-- CreateTable
CREATE TABLE `TypingTestResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `wpm` INTEGER NOT NULL,
    `accuracy` DOUBLE NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Exercise_lessonId_exerciseIndex_key` ON `Exercise`(`lessonId`, `exerciseIndex`);

-- AddForeignKey
-- ALTER TABLE `Progress` ADD CONSTRAINT `Progress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypingTestResult` ADD CONSTRAINT `TypingTestResult_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
