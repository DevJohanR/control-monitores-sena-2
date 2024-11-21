-- CreateTable
CREATE TABLE `Instructor` (
    `idInstructor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreInstructor` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Instructor_nombreInstructor_key`(`nombreInstructor`),
    UNIQUE INDEX `Instructor_userId_key`(`userId`),
    PRIMARY KEY (`idInstructor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `idHorario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombrePrograma` VARCHAR(191) NOT NULL,
    `numeroFicha` VARCHAR(191) NOT NULL,
    `competencia` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NOT NULL,
    `nombreAmbiente` VARCHAR(191) NOT NULL,
    `bloque` VARCHAR(191) NOT NULL,
    `sede` VARCHAR(191) NOT NULL,
    `jornada` VARCHAR(191) NOT NULL,
    `diaSemana` VARCHAR(191) NOT NULL,
    `numeroTrimestre` INTEGER NOT NULL,
    `anoTrimestre` INTEGER NOT NULL,
    `horaInicio` DATETIME(3) NOT NULL,
    `horaFin` DATETIME(3) NOT NULL,
    `idInstructor` INTEGER NOT NULL,

    PRIMARY KEY (`idHorario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `acronimoRA` VARCHAR(191) NULL,
    `competenciaId` INTEGER NOT NULL,

    PRIMARY KEY (`idRA`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Archivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ruta` VARCHAR(191) NOT NULL,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Instructor` ADD CONSTRAINT `Instructor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_idInstructor_fkey` FOREIGN KEY (`idInstructor`) REFERENCES `Instructor`(`idInstructor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Competencia` ADD CONSTRAINT `Competencia_programaId_fkey` FOREIGN KEY (`programaId`) REFERENCES `Programa`(`idPrograma`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RA` ADD CONSTRAINT `RA_competenciaId_fkey` FOREIGN KEY (`competenciaId`) REFERENCES `Competencia`(`idCompetencia`) ON DELETE RESTRICT ON UPDATE CASCADE;
