/*
  Warnings:

  - The values [DEAL_BONUS] on the enum `Transaction_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `approvalStatus` ENUM('PENDING', 'APPROVED', 'HOLD', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `Transaction` MODIFY `type` ENUM('SUBSCRIPTION', 'DEAL', 'PAYOUT') NOT NULL DEFAULT 'SUBSCRIPTION';

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('FREE_USER', 'PAID_USER', 'ADMIN', 'SUPER_ADMIN', 'SETUP_PENDING', 'PAYMENT_PENDING', 'ONBOARDING') NOT NULL DEFAULT 'SETUP_PENDING';

-- CreateTable
CREATE TABLE `Deals` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `seller_id` VARCHAR(191) NOT NULL,
    `buyer_id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `skus` VARCHAR(191) NOT NULL,
    `adminComment` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'HOLD', 'REJECTED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Withdrawals` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `status` ENUM('APPROVED', 'PENDING', 'HOLD', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `walletBalance` DECIMAL(65, 30) NULL,
    `adminNote` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Deals` ADD CONSTRAINT `Deals_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deals` ADD CONSTRAINT `Deals_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deals` ADD CONSTRAINT `Deals_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Withdrawals` ADD CONSTRAINT `Withdrawals_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
