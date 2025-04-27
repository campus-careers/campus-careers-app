/*
  Warnings:

  - You are about to drop the `AdminList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AdminList";

-- CreateTable
CREATE TABLE "adminList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "skills" TEXT[],
    "interests" TEXT[],
    "location" TEXT NOT NULL,
    "companies" TEXT[],
    "interviews" TEXT[],

    CONSTRAINT "adminList_pkey" PRIMARY KEY ("id")
);
