/*
  Warnings:

  - The `idealSkill` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `firstName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Student` table. All the data in the column will be lost.
  - The `skills` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `image` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Skills" ADD VALUE 'coding';
ALTER TYPE "Skills" ADD VALUE 'design';

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "studentId" INTEGER,
DROP COLUMN "idealSkill",
ADD COLUMN     "idealSkill" TEXT[];

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "interviews" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[];

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
