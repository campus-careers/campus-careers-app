import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  for (const data of config.company) {
    // console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.company.upsert({
      where: { id: config.company.indexOf(data) + 1 },
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
    });
  }
  for (const data of config.defaultData) {
    // console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.student.upsert({
      where: { id: config.student.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        interests: data.interests,
        companies: data.companies,
        interviews: data.interviews,
        image: data.image,
        location: data.location,
        skills: data.skills,
      },
    });
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
