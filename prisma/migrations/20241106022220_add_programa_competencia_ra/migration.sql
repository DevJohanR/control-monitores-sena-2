/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Instructor` ADD COLUMN `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `instructorId` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Programa` (
    `idPrograma` INTEGER NOT NULL AUTO_INCREMENT,
    `nombrePrograma` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPrograma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Competencia` (
    `idCompetencia` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreCompetencia` VARCHAR(191) NOT NULL,
    `programaId` INTEGER NOT NULL,

    PRIMARY KEY (`idCompetencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RA` (
    `idRA` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionRA` VARCHAR(191) NOT NULL,
    `competenciaId` INTEGER NOT NULL,

    PRIMARY KEY (`idRA`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Instructor_userId_key` ON `Instructor`(`userId`);

-- AddForeignKey
ALTER TABLE `Instructor` ADD CONSTRAINT `Instructor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Competencia` ADD CONSTRAINT `Competencia_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `Programa`(`idPrograma`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RA` ADD CONSTRAINT `RA_competenciaId_fkey` FOREIGN KEY (`competenciaId`) REFERENCES `Competencia`(`idCompetencia`) ON DELETE RESTRICT ON UPDATE CASCADE;
