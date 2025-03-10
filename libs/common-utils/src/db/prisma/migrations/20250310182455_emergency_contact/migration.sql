/*
  Warnings:

  - You are about to drop the column `emergencyContactCountryCode` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactPhone` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `emergencyContact` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "emergencyContactCountryCode",
DROP COLUMN "emergencyContactName",
DROP COLUMN "emergencyContactPhone",
ADD COLUMN     "emergencyContact" JSONB NOT NULL;
