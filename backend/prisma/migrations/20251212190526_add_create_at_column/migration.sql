/*
  Warnings:

  - Added the required column `createdAt` to the `residents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "residents" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
