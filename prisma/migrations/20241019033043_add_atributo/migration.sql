/*
  Warnings:

  - Added the required column `numeroFicha` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Horario` ADD COLUMN `numeroFicha` VARCHAR(191) NOT NULL;
