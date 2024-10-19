/*
  Warnings:

  - Added the required column `numeroFicha` to the `Ficha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ficha` ADD COLUMN `numeroFicha` INTEGER NOT NULL;
