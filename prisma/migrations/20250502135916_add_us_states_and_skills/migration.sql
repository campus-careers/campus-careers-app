/*
  Warnings:

  - The values [Honolulu,SanFrancisco,London,Tokyo] on the enum `Locations` will be removed. If these variants are still used in the database, this will fail.
  - The values [CPlusPlus,Design] on the enum `Skill` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Locations_new" AS ENUM ('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'NewHampshire', 'NewJersey', 'NewMexico', 'NewYork', 'NorthCarolina', 'NorthDakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'RhodeIsland', 'SouthCarolina', 'SouthDakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'WestVirginia', 'Wisconsin', 'Wyoming', 'Remote');
ALTER TABLE "Filter" ALTER COLUMN "locations" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "location" TYPE "Locations_new" USING ("location"::text::"Locations_new");
ALTER TABLE "Company" ALTER COLUMN "location" TYPE "Locations_new" USING ("location"::text::"Locations_new");
ALTER TABLE "Filter" ALTER COLUMN "locations" TYPE "Locations_new" USING ("locations"::text::"Locations_new");
ALTER TABLE "adminList" ALTER COLUMN "location" TYPE "Locations_new" USING ("location"::text::"Locations_new");
ALTER TYPE "Locations" RENAME TO "Locations_old";
ALTER TYPE "Locations_new" RENAME TO "Locations";
DROP TYPE "Locations_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Skill_new" AS ENUM ('JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'CSharp', 'Ruby', 'Go', 'Rust', 'Kotlin', 'Swift', 'HTML', 'CSS', 'SQL', 'R', 'PHP', 'Perl', 'Scala', 'MATLAB', 'Dart', 'Elixir', 'Shell', 'Assembly', 'ObjectiveC');
ALTER TABLE "User" ALTER COLUMN "skills" TYPE "Skill_new"[] USING ("skills"::text::"Skill_new"[]);
ALTER TABLE "Filter" ALTER COLUMN "skills" TYPE "Skill_new"[] USING ("skills"::text::"Skill_new"[]);
ALTER TABLE "adminList" ALTER COLUMN "skills" TYPE "Skill_new"[] USING ("skills"::text::"Skill_new"[]);
ALTER TYPE "Skill" RENAME TO "Skill_old";
ALTER TYPE "Skill_new" RENAME TO "Skill";
DROP TYPE "Skill_old";
COMMIT;

-- AlterTable
ALTER TABLE "Filter" ALTER COLUMN "locations" DROP DEFAULT;
