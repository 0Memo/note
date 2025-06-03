-- AlterTable
ALTER TABLE `Note` ADD COLUMN `lastSyncedDate` DATETIME(3) NULL,
    ADD COLUMN `lastSyncedText` TEXT NULL;
