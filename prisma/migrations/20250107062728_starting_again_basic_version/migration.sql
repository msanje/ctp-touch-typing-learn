/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `desciption` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_userId_fkey`;

-- AlterTable
ALTER TABLE `Lesson` DROP COLUMN `createdAt`,
    DROP COLUMN `desciption`,
    DROP COLUMN `updatedAt`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `Progress`;

-- DropTable
DROP TABLE `User`;

-- CreateIndex
CREATE UNIQUE INDEX `Lesson_title_key` ON `Lesson`(`title`);
