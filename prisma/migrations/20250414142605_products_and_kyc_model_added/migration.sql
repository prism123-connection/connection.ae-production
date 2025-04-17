-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `type` ENUM('SUBSCRIPTION', 'DEAL_BONUS', 'PAYOUT') NOT NULL DEFAULT 'SUBSCRIPTION';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `kycDone` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortDescription` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `goLiveAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductTag` (
    `id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProductTag_productId_value_key`(`productId`, `value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ProductImage_productId_url_key`(`productId`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kyc` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `iban` VARCHAR(191) NULL,
    `accountNumber` VARCHAR(191) NULL,
    `swiftCode` VARCHAR(191) NULL,
    `routingNumber` VARCHAR(191) NULL,
    `entityName` VARCHAR(191) NULL,
    `commercialRegNumber` VARCHAR(191) NULL,
    `crExpiryDate` DATETIME(3) NULL,
    `incorporationDate` DATETIME(3) NULL,
    `countryOfIncorporation` VARCHAR(191) NULL,
    `typeOfEntity` VARCHAR(191) NULL,
    `registeredAddress` VARCHAR(191) NULL,
    `operationalAddress` VARCHAR(191) NULL,
    `contactPersonName` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `emailAddress` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `fullName` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NULL,
    `shareholdingPercentage` DOUBLE NULL,
    `passportOrIdNumber` VARCHAR(191) NULL,
    `idDocumentUrl` VARCHAR(191) NULL,
    `politicallyExposed` BOOLEAN NULL,
    `underSanctions` BOOLEAN NULL,
    `tradeLicenseUrl` VARCHAR(191) NULL,
    `passportCopiesUrl` VARCHAR(191) NULL,
    `boardResolutionUrl` VARCHAR(191) NULL,
    `proofOfAddressUrl` VARCHAR(191) NULL,
    `additionalDocumentsUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Kyc_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductTag` ADD CONSTRAINT `ProductTag_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kyc` ADD CONSTRAINT `Kyc_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
