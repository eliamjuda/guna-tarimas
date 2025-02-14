-- CreateTable
CREATE TABLE `Almacen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Almacen_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoTarima` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoTarima_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovimientosTarima` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recibidoPor` VARCHAR(191) NOT NULL,
    `almacenId` INTEGER NOT NULL,
    `tipoTarimaId` INTEGER NOT NULL,
    `tipoMovimiento` VARCHAR(191) NOT NULL DEFAULT 'entrada',
    `cantidad` INTEGER NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovimientosTarima` ADD CONSTRAINT `MovimientosTarima_almacenId_fkey` FOREIGN KEY (`almacenId`) REFERENCES `Almacen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimientosTarima` ADD CONSTRAINT `MovimientosTarima_tipoTarimaId_fkey` FOREIGN KEY (`tipoTarimaId`) REFERENCES `TipoTarima`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
