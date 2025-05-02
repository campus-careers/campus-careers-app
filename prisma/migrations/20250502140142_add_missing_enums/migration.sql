/*
  Warnings:

  - The values [TypeScript,C,Go,Rust,Kotlin,Swift] on the enum `Skill` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Skill_new" AS ENUM ('JavaScript', 'Python', 'Java', 'CSharp', 'Ruby', 'CPlusPlus', 'Design', 'HTML', 'CSS', 'SQL', 'R', 'PHP', 'Perl', 'Scala', 'MATLAB', 'Dart', 'Elixir', 'Shell', 'Assembly', 'ObjectiveC');
ALTER TABLE "User" ALTER COLUMN "skills" TYPE "Skill_new"[] USING ("skills"::text::"Skill_new"[]);
ALTER TABLE "Filter" ALTER COLUMN "skills" TYPE "Skill_new"[] USING ("skills"::text::"Skill_new"[]);
ALTER TABLE "adminList" ALTER COLUMN "skills" TYPE "Skill_new"[] USING ("skills"::text::"Skill_new"[]);
ALTER TYPE "Skill" RENAME TO "Skill_old";
ALTER TYPE "Skill_new" RENAME TO "Skill";
DROP TYPE "Skill_old";
COMMIT;
