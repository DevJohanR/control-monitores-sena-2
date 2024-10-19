/*
  Warnings:

  - You are about to drop the column `nombreInstructor` on the `Horario` table. All the data in the column will be lost.
  - Added the required column `idInstructor` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Horario` DROP COLUMN `nombreInstructor`,
    ADD COLUMN `idInstructor` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Instructor` (
    `idInstructor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreInstructor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Instructor_nombreInstructor_key`(`nombreInstructor`),
    PRIMARY KEY (`idInstructor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idInstructor_fkey` FOREIGN KEY (`idInstructor`) REFERENCES `Instructor`(`idInstructor`) ON DELETE RESTRICT ON UPDATE CASCADE;
