-- DropForeignKey
ALTER TABLE `movimientostarima` DROP FOREIGN KEY `MovimientosTarima_almacenId_fkey`;

-- DropForeignKey
ALTER TABLE `movimientostarima` DROP FOREIGN KEY `MovimientosTarima_tipoTarimaId_fkey`;

-- AlterTable
ALTER TABLE `almacen` ADD COLUMN `tarimasDisponibles` INTEGER NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `movimientostarima` ADD CONSTRAINT `movimientostarima_almacenId_fkey` FOREIGN KEY (`almacenId`) REFERENCES `almacen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
