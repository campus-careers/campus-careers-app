-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location" "Locations" NOT NULL DEFAULT 'Remote',
ADD COLUMN     "skills" "Skill"[];
