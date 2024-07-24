/*
  Warnings:

  - Added the required column `transactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
---- Add the column as nullable first
ALTER TABLE "Transaction" ADD COLUMN "transactionType" TEXT;

-- Update existing rows with a default value
UPDATE "Transaction" SET "transactionType" = 'expense' WHERE "transactionType" IS NULL;

-- Make the column required
ALTER TABLE "Transaction" ALTER COLUMN "transactionType" SET NOT NULL;
