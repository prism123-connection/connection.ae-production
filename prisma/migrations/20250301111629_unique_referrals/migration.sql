/*
  Warnings:

  - A unique constraint covering the columns `[referred_id]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('FREE_USER', 'PAID_USER', 'ADMIN', 'SETUP_PENDING') NOT NULL DEFAULT 'SETUP_PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `Referral_referred_id_key` ON `Referral`(`referred_id`);
