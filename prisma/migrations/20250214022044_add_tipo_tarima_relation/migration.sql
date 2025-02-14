-- AddForeignKey
ALTER TABLE `movimientostarima` ADD CONSTRAINT `movimientostarima_tipoTarimaId_fkey` FOREIGN KEY (`tipoTarimaId`) REFERENCES `tipotarima`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `movimientostarima` RENAME INDEX `movimientostarima_almacenId_fkey` TO `MovimientosTarima_almacenId_fkey`;
