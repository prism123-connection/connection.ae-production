/*
  Warnings:

  - You are about to drop the column `fullName` on the `Kyc` table. All the data in the column will be lost.
  - You are about to drop the column `idDocumentUrl` on the `Kyc` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Kyc` table. All the data in the column will be lost.
  - You are about to drop the column `passportOrIdNumber` on the `Kyc` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Kyc` table. All the data in the column will be lost.
  - You are about to drop the column `shareholdingPercentage` on the `Kyc` table. All the data in the column will be lost.
  - Added the required column `agreedToTerms` to the `Kyc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdPartyConsent` to the `Kyc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Kyc` DROP COLUMN `fullName`,
    DROP COLUMN `idDocumentUrl`,
    DROP COLUMN `nationality`,
    DROP COLUMN `passportOrIdNumber`,
    DROP COLUMN `role`,
    DROP COLUMN `shareholdingPercentage`,
    ADD COLUMN `agreedToTerms` BOOLEAN NOT NULL,
    ADD COLUMN `thirdPartyConsent` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `KycOwners` (
    `id` VARCHAR(191) NOT NULL,
    `kyc_id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `shareholding` DOUBLE NOT NULL,
    `passportNumber` VARCHAR(191) NOT NULL,
    `idDocumentUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KycOwners` ADD CONSTRAINT `KycOwners_kyc_id_fkey` FOREIGN KEY (`kyc_id`) REFERENCES `Kyc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
