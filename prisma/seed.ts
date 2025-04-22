import { PrismaClient, Role, Skill, Locations } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
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
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  for (const data of config.defaultData) {
    // const condition = (data.condition as Condition) || Condition.good;
    console.log(`  Adding Sucess: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.adminList.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        skills: data.skills as Skill[],
        location: data.location as Locations,
        companies: data.companies,
        interviews: data.interviews,
        image: data.image,
        interests: data.interests,
      },
    });
  }
  console.log('Seeding complete');
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
