import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seed default accounts
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role = (account.role as Role) || Role.USER;
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
    }),
  );

  // Seed stuff
  await Promise.all(
    config.defaultData.map((data, index) => {
      const condition = (data.condition as Condition) || Condition.good;
      console.log(`  Adding stuff: ${JSON.stringify(data)}`);
      return prisma.stuff.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          name: data.name,
          quantity: data.quantity,
          owner: data.owner,
          condition,
        },
      });
    }),
  );

  // Seed companies
  await Promise.all(
    config.company.map(async (company) => {
      console.log(`  Creating company: ${company.name}`);
      await prisma.company.upsert({
        where: { name: company.name }, // assumes name is @unique
        update: {},
        create: {
          name: company.name,
          overview: company.overview,
          location: company.location,
          jobs: company.jobs,
          contacts: company.contacts,
        },
      });
    }),
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
