/*
  Warnings:

  - You are about to drop the column `asignatura` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `nombreFicha` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `tema` on the `Horario` table. All the data in the column will be lost.
  - Added the required column `competencia` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombrePrograma` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Horario` DROP COLUMN `asignatura`,
    DROP COLUMN `nombreFicha`,
    DROP COLUMN `tema`,
    ADD COLUMN `competencia` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombrePrograma` VARCHAR(191) NOT NULL;
