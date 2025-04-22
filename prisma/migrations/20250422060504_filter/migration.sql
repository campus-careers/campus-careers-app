/*
  Warnings:

  - The `skills` column on the `adminList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `location` on the `adminList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('JavaScript', 'Python', 'Java', 'CSharp', 'Ruby', 'CPlusPlus', 'Design');

-- CreateEnum
CREATE TYPE "Locations" AS ENUM ('Honolulu', 'NewYork', 'SanFrancisco', 'London', 'Tokyo', 'Remote');

-- AlterTable
ALTER TABLE "adminList" DROP COLUMN "skills",
ADD COLUMN     "skills" "Skill"[],
DROP COLUMN "location",
ADD COLUMN     "location" "Locations" NOT NULL;

-- CreateTable
CREATE TABLE "Filter" (
    "id" SERIAL NOT NULL,
    "skills" "Skill" NOT NULL DEFAULT 'JavaScript',
    "locations" "Locations" NOT NULL DEFAULT 'Honolulu',

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);
