/*
  Warnings:

  - You are about to drop the column `status` on the `Deals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Deals` DROP COLUMN `status`,
    ADD COLUMN `dealStatus` ENUM('PENDING', 'APPROVED', 'HOLD', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `paymentStatus` ENUM('PENDING', 'RECEIVED', 'FAILED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
