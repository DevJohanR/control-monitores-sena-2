/*
  Warnings:

  - You are about to drop the column `asignatura` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `bloque` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `ficha` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `horaFin` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `idInstructor` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `ra` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `sede` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `tema` on the `Ambiente` table. All the data in the column will be lost.
  - You are about to drop the column `ambiente` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `bloque` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `horaFin` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `idInstructor` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `numeroFicha` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `ra` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `sede` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `tema` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `idAmbiente` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `idDiaSemana` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `idFicha` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `idInstructor` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `idJornada` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `ambiente` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `asignatura` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `bloque` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `ficha` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `horaFin` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `ra` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `sede` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `tema` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `numeroTrimestre` on the `Trimestre` table. All the data in the column will be lost.
  - You are about to alter the column `ano` on the `Trimestre` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `DiasSemana` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jornadas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dia,jornada,horaInicio,ambienteId]` on the table `Horario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dia,jornada,horaInicio,instructorId]` on the table `Horario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dia,jornada,horaInicio,fichaId]` on the table `Horario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Ambiente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asignaturaId` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ambienteId` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dia` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fichaId` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaInicio` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jornada` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trimestreId` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Trimestre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ambiente` DROP FOREIGN KEY `Ambiente_idInstructor_fkey`;

-- DropForeignKey
ALTER TABLE `Ficha` DROP FOREIGN KEY `Ficha_idInstructor_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_idAmbiente_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_idDiaSemana_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_idFicha_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_idInstructor_fkey`;

-- DropForeignKey
ALTER TABLE `Horario` DROP FOREIGN KEY `Horario_idJornada_fkey`;

-- AlterTable
ALTER TABLE `Ambiente` DROP COLUMN `asignatura`,
    DROP COLUMN `bloque`,
    DROP COLUMN `ficha`,
    DROP COLUMN `horaFin`,
    DROP COLUMN `horarioInicio`,
    DROP COLUMN `idInstructor`,
    DROP COLUMN `ra`,
    DROP COLUMN `sede`,
    DROP COLUMN `tema`,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Ficha` DROP COLUMN `ambiente`,
    DROP COLUMN `bloque`,
    DROP COLUMN `horaFin`,
    DROP COLUMN `horarioInicio`,
    DROP COLUMN `idInstructor`,
    DROP COLUMN `numeroFicha`,
    DROP COLUMN `ra`,
    DROP COLUMN `sede`,
    DROP COLUMN `tema`,
    ADD COLUMN `asignaturaId` INTEGER NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Horario` DROP COLUMN `horarioInicio`,
    DROP COLUMN `idAmbiente`,
    DROP COLUMN `idDiaSemana`,
    DROP COLUMN `idFicha`,
    DROP COLUMN `idInstructor`,
    DROP COLUMN `idJornada`,
    ADD COLUMN `ambienteId` INTEGER NOT NULL,
    ADD COLUMN `dia` VARCHAR(191) NOT NULL,
    ADD COLUMN `fichaId` INTEGER NOT NULL,
    ADD COLUMN `horaInicio` DATETIME(3) NOT NULL,
    ADD COLUMN `instructorId` INTEGER NOT NULL,
    ADD COLUMN `jornada` ENUM('Manana', 'Tarde', 'Noche') NOT NULL,
    ADD COLUMN `trimestreId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Instructor` DROP COLUMN `ambiente`,
    DROP COLUMN `asignatura`,
    DROP COLUMN `bloque`,
    DROP COLUMN `ficha`,
    DROP COLUMN `horaFin`,
    DROP COLUMN `horarioInicio`,
    DROP COLUMN `ra`,
    DROP COLUMN `sede`,
    DROP COLUMN `tema`;

-- AlterTable
ALTER TABLE `Trimestre` DROP COLUMN `numeroTrimestre`,
    ADD COLUMN `numero` INTEGER NOT NULL,
    MODIFY `ano` INTEGER NOT NULL;

-- DropTable
DROP TABLE `DiasSemana`;

-- DropTable
DROP TABLE `Jornadas`;

-- CreateTable
CREATE TABLE `HistorialTrimestre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trimestreId` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asignatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AsignaturaToInstructor` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AsignaturaToInstructor_AB_unique`(`A`, `B`),
    INDEX `_AsignaturaToInstructor_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Horario_instructorId_fichaId_ambienteId_idx` ON `Horario`(`instructorId`, `fichaId`, `ambienteId`);

-- CreateIndex
CREATE UNIQUE INDEX `Horario_dia_jornada_horaInicio_ambienteId_key` ON `Horario`(`dia`, `jornada`, `horaInicio`, `ambienteId`);

-- CreateIndex
CREATE UNIQUE INDEX `Horario_dia_jornada_horaInicio_instructorId_key` ON `Horario`(`dia`, `jornada`, `horaInicio`, `instructorId`);

-- CreateIndex
CREATE UNIQUE INDEX `Horario_dia_jornada_horaInicio_fichaId_key` ON `Horario`(`dia`, `jornada`, `horaInicio`, `fichaId`);

-- AddForeignKey
ALTER TABLE `Ficha` ADD CONSTRAINT `Ficha_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `Asignatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_trimestreId_fkey` FOREIGN KEY (`trimestreId`) REFERENCES `Trimestre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_fichaId_fkey` FOREIGN KEY (`fichaId`) REFERENCES `Ficha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_ambienteId_fkey` FOREIGN KEY (`ambienteId`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialTrimestre` ADD CONSTRAINT `HistorialTrimestre_trimestreId_fkey` FOREIGN KEY (`trimestreId`) REFERENCES `Trimestre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AsignaturaToInstructor` ADD CONSTRAINT `_AsignaturaToInstructor_A_fkey` FOREIGN KEY (`A`) REFERENCES `Asignatura`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AsignaturaToInstructor` ADD CONSTRAINT `_AsignaturaToInstructor_B_fkey` FOREIGN KEY (`B`) REFERENCES `Instructor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
