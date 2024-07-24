/*
  Warnings:

  - Added the required column `paymentType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/


-- Add the column as nullable first
ALTER TABLE "Transaction" ADD COLUMN "paymentType" TEXT;

-- Update existing rows with a default value
UPDATE "Transaction" SET "paymentType" = 'Cash' WHERE "paymentType" IS NULL;

-- Make the column required
ALTER TABLE "Transaction" ALTER COLUMN "paymentType" SET NOT NULL;
