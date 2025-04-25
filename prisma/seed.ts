import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Seeding the database...');
  const password = await hash('changeme', 10);

  // Seed users
  await Promise.all(
    config.defaultAccounts.map((account) => {
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

  // Seed companies
  await Promise.all(
    config.company.map((data) => prisma.company.upsert({
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

  // Seed students
  await Promise.all(
    config.defaultData.map((data) => prisma.student.create({
      data: {
        name: data.name,
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
