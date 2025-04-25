import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seed users in parallel
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

  // Seed stuff in parallel
  await Promise.all(
    config.defaultData.map(async (data, index) => {
      const condition = (data.condition as Condition) || Condition.good;
      console.log(`  Adding stuff: ${JSON.stringify(data)}`);
      await prisma.stuff.upsert({
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

  // Seed students in parallel
  await Promise.all(
    config.defaultStudent.map(async (student) => {
      console.log(`  Creating student: ${student.email}`);
      await prisma.student.upsert({
        where: { email: student.email },
        update: {},
        create: {
          email: student.email,
          fullName: student.fullName,
          location: student.location,
          skills: student.skills,
          image: student.image,
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
