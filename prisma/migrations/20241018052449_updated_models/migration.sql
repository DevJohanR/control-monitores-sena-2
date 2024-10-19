-- AlterTable
ALTER TABLE `Ambiente` ADD COLUMN `horaFin` DATETIME(3) NULL,
    ADD COLUMN `horarioInicio` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Ficha` ADD COLUMN `horaFin` DATETIME(3) NULL,
    ADD COLUMN `horarioInicio` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Instructor` ADD COLUMN `horaFin` DATETIME(3) NULL,
    ADD COLUMN `horarioInicio` DATETIME(3) NULL;
