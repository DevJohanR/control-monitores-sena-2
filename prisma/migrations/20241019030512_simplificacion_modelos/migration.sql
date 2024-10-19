/*
  Warnings:

  - The primary key for the `Horario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ambienteId` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `dia` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `fichaId` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `instructorId` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `trimestreId` on the `Horario` table. All the data in the column will be lost.
  - You are about to alter the column `jornada` on the `Horario` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the `Ambiente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Asignatura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ficha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistorialTrimestre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Instructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trimestre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AsignaturaToInstructor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `anoTrimestre` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asignatura` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloque` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diaSemana` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idHorario` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreAmbiente` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreFicha` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreInstructor` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroTrimestre` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ra` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sede` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tema` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ficha` DROP FOREIGN KEY `Ficha_asignaturaId_fkey`;

-- DropForeignKey
ALTER TABLE `HistorialTrimestre` DROP FOREIGN KEY `HistorialTrimestre_trimestreId_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_ambienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_fichaId_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_instructorId_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_trimestreId_fkey`;

-- DropForeignKey
ALTER TABLE `_AsignaturaToInstructor` DROP FOREIGN KEY `_AsignaturaToInstructor_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AsignaturaToInstructor` DROP FOREIGN KEY `_AsignaturaToInstructor_B_fkey`;

-- DropIndex
DROP INDEX `Horario_dia_jornada_horaInicio_ambienteId_key` ON `Horario`;

-- DropIndex
DROP INDEX `Horario_dia_jornada_horaInicio_fichaId_key` ON `Horario`;

-- DropIndex
DROP INDEX `Horario_dia_jornada_horaInicio_instructorId_key` ON `Horario`;

-- DropIndex
DROP INDEX `Horario_instructorId_fichaId_ambienteId_idx` ON `Horario`;

-- AlterTable
ALTER TABLE `Horario` DROP PRIMARY KEY,
    DROP COLUMN `ambienteId`,
    DROP COLUMN `dia`,
    DROP COLUMN `fichaId`,
    DROP COLUMN `id`,
    DROP COLUMN `instructorId`,
    DROP COLUMN `trimestreId`,
    ADD COLUMN `anoTrimestre` INTEGER NOT NULL,
    ADD COLUMN `asignatura` VARCHAR(191) NOT NULL,
    ADD COLUMN `bloque` VARCHAR(191) NOT NULL,
    ADD COLUMN `diaSemana` VARCHAR(191) NOT NULL,
    ADD COLUMN `idHorario` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nombreAmbiente` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombreFicha` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombreInstructor` VARCHAR(191) NOT NULL,
    ADD COLUMN `numeroTrimestre` INTEGER NOT NULL,
    ADD COLUMN `ra` VARCHAR(191) NOT NULL,
    ADD COLUMN `sede` VARCHAR(191) NOT NULL,
    ADD COLUMN `tema` VARCHAR(191) NOT NULL,
    MODIFY `jornada` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idHorario`);

-- DropTable
DROP TABLE `Ambiente`;

-- DropTable
DROP TABLE `Asignatura`;

-- DropTable
DROP TABLE `Ficha`;

-- DropTable
DROP TABLE `HistorialTrimestre`;

-- DropTable
DROP TABLE `Instructor`;

-- DropTable
DROP TABLE `Trimestre`;

-- DropTable
DROP TABLE `_AsignaturaToInstructor`;
