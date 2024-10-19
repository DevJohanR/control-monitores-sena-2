-- CreateTable
CREATE TABLE `DiasSemana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idInstructor` INTEGER NOT NULL,
    `idFicha` INTEGER NOT NULL,
    `idAmbiente` INTEGER NOT NULL,
    `idDiaSemana` INTEGER NOT NULL,
    `idJornada` INTEGER NOT NULL,
    `horarioInicio` DATETIME(3) NOT NULL,
    `horaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jornadas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jornada` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ficha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idInstructor` INTEGER NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NOT NULL,
    `ambiente` VARCHAR(191) NOT NULL,
    `bloque` VARCHAR(191) NOT NULL,
    `sede` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `asignatura` VARCHAR(191) NOT NULL,
    `ficha` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NOT NULL,
    `ambiente` VARCHAR(191) NOT NULL,
    `bloque` VARCHAR(191) NOT NULL,
    `sede` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ambiente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asignatura` VARCHAR(191) NOT NULL,
    `ficha` VARCHAR(191) NOT NULL,
    `tema` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NOT NULL,
    `idInstructor` INTEGER NOT NULL,
    `bloque` VARCHAR(191) NOT NULL,
    `sede` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trimestre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroTrimestre` VARCHAR(191) NOT NULL,
    `ano` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idDiaSemana_fkey` FOREIGN KEY (`idDiaSemana`) REFERENCES `DiasSemana`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idAmbiente_fkey` FOREIGN KEY (`idAmbiente`) REFERENCES `Ambiente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idJornada_fkey` FOREIGN KEY (`idJornada`) REFERENCES `Jornadas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idFicha_fkey` FOREIGN KEY (`idFicha`) REFERENCES `Ficha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idInstructor_fkey` FOREIGN KEY (`idInstructor`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ficha` ADD CONSTRAINT `Ficha_idInstructor_fkey` FOREIGN KEY (`idInstructor`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ambiente` ADD CONSTRAINT `Ambiente_idInstructor_fkey` FOREIGN KEY (`idInstructor`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
