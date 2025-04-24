/*
  Warnings:

  - You are about to drop the column `studentId` on the `Company` table. All the data in the column will be lost.
  - The `idealSkill` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_studentId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "studentId",
DROP COLUMN "idealSkill",
ADD COLUMN     "idealSkill" TEXT[] DEFAULT ARRAY['python', 'c']::TEXT[];

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "companies" TEXT[],
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY['python', 'c']::TEXT[];

-- DropEnum
DROP TYPE "Skills";
