/*
  Warnings:

  - The `idealSkill` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "idealSkill",
ADD COLUMN     "idealSkill" "Skills"[] DEFAULT ARRAY['c', 'python']::"Skills"[];

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "skills",
ADD COLUMN     "skills" "Skills"[] DEFAULT ARRAY['java', 'c']::"Skills"[];
