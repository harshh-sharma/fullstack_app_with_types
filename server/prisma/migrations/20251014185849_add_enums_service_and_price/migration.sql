/*
  Warnings:

  - Changed the type of `type` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `ServicePriceOption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('NORMAL', 'VIP');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('HOURLY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "type",
ADD COLUMN     "type" "ServiceType" NOT NULL;

-- AlterTable
ALTER TABLE "ServicePriceOption" DROP COLUMN "type",
ADD COLUMN     "type" "PriceType" NOT NULL;
