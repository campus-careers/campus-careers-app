import { PrismaClient, Role, Skill, Locations, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Seeding the database...');
  const password = await hash('changeme', 10);

  // ✅ Seed users
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
          skills: [],
          location: Locations.Remote,
        },
      });
    }),
  );

  // ✅ Seed adminList (treated as students)
  await Promise.all(
    config.defaultData.map((data) => prisma.adminList.create({
      data: {
        name: data.name,
        image: data.image,
        skills: data.skills as Skill[],
        interests: data.interests,
        location: Locations[data.location as keyof typeof Locations],
        companies: data.companies,
        interviews: data.interviews,
      },
    })),
  );

  // ✅ Seed Stuff if needed (example only — modify as needed)
  await prisma.stuff.create({
    data: {
      name: 'Example Item',
      quantity: 10,
      owner: 'admin@foo.com',
      condition: Condition.good,
    },
  });

  // ✅ Seed Filters
  const filters = [
    {
      skills: ['JavaScript', 'Python', 'Design'] as Skill[],
      locations: Locations.Remote,
    },
  ];

  await Promise.all(
    filters.map((filter) => prisma.filter.create({
      data: {
        skills: filter.skills,
        locations: filter.locations,
      },
    })),
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
