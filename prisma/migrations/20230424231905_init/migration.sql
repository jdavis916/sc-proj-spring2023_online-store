-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sku` INTEGER NOT NULL,
    `item_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `item_category` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Item_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191),
    PRIMARY KEY (`id`),
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
