import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

// ===== Type Definitions for JSON Data =====
type Account = {
  email: string;
  password: string;
  role?: string;
};

type CompanyData = {
  name: string;
  salary: number;
  overview: string;
  location: string;
  contacts: string;
  jobs: string;
  idealSkill: string[];
};

type StudentData = {
  name: string;
  email: string;
  skills: string[];
  interests: string[];
  location: string;
  companies: string[];
  interviews: string[];
  image: string;
};

async function main() {
  console.log('🔧 Seeding the database...');
  const password = await hash('changeme', 10);

  // Seed users
  await Promise.all(
    (config.defaultAccounts as Account[]).map((account) => {
      const role: Role = (account.role as Role) || Role.USER;
      console.log(`  ↪️ Creating user: ${account.email} with role: ${role}`);
      return prisma.user.upsert({
        where: { email: account.email },
        update: {
          password,
          role,
        },
        create: {
          email: account.email,
          password,
          role,
        },
      });
    }),
  );

  // Seed companies (from "defaultStudent" in your JSON)
  await Promise.all(
    (config.defaultStudent as CompanyData[]).map((data) => prisma.company.upsert({
      where: { name: data.name },
      update: {},
      create: {
        name: data.name,
        salary: data.salary,
        overview: data.overview,
        location: data.location,
        contacts: data.contacts,
        jobs: data.jobs,
        idealSkill: data.idealSkill,
      },
    })),
  );

  // Seed students (with email required)
  await Promise.all(
    (config.defaultData as StudentData[]).map((data) => prisma.student.create({
      data: {
        name: data.name,
        email: data.email,
        interests: data.interests,
        companies: data.companies,
        interviews: data.interviews,
        location: data.location,
        skills: data.skills,
        image: data.image,
      },
    })),
  );

  console.log('✅ Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
