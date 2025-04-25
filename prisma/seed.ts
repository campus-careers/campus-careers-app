import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Seeding the database...');
  const password = await hash('changeme', 10);

  // Seed users
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role = (account.role as Role) || Role.USER;
      await prisma.user.upsert({
        where: { email: account.email },
        update: {},
        create: {
          email: account.email,
          password,
          role,
        },
      });
    }),
  );

  // Seed students (requires you to add `email` field to defaultData)
  await Promise.all(
    config.defaultData.map(async (data, i) => {
      const email = `student${i + 1}@example.com`; // 👈 generate dummy email if not present
      await prisma.student.create({
        data: {
          name: data.name,
          email, // required by schema
          skills: data.skills,
          interests: data.interests,
          location: data.location,
          companies: data.companies,
          interviews: data.interviews,
          image: data.image,
        },
      });
    }),
  );

  // Seed companies (from defaultStudent list)
  await Promise.all(
    config.defaultStudent.map(async (company) => {
      await prisma.company.upsert({
        where: { name: company.name },
        update: {},
        create: {
          name: company.name,
          salary: company.salary,
          overview: company.overview,
          location: company.location,
          jobs: company.jobs,
          contacts: company.contacts,
          idealSkill: company.idealSkill,
        },
      });
    }),
  );

  console.log('✅ Seeding complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
