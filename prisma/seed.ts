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
  await Promise.all(
    config.defaultData.map(async (data, index) => {
      console.log(`  Adding Sucess: ${JSON.stringify(data)}`);
      await prisma.adminList.upsert({
        where: { id: index + 1 },
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
    }),
  );

  // Seed Filter Table
  const filters = [
    {
      skills: ['JavaScript', 'Python'] as Skill[], // Ensure these match the Skill enum
      locations: 'Remote' as Locations, // Ensure this matches the Locations enum
    },
  ];

  await Promise.all(
    filters.map(async (filter) => {
      console.log(`  Adding Filter Item: ${JSON.stringify(filter)}`);
      await prisma.filter.create({
        data: {
          skills: filter.skills[0], // Use the first skill from the array
          locations: filter.locations,
        },
        // skills: filter.skills[0] as Skill, // Assign the first skill or adjust schema to accept arrays
        // locations: filter.locations as Locations,
      });
    }),
  );
  console.log('Seeding complete');
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
