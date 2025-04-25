-- CreateEnum
CREATE TYPE "Skills" AS ENUM ('engLicense', 'compTIACert', 'c', 'python', 'java', 'aiExperience');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "idealSkill" "Skills"[];

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "skills" "Skills"[],

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
