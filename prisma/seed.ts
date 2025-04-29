import { PrismaClient, Skill, Locations, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

// real
async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seeding users
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role = (account.role as Role) || Role.USER;
      console.log(`  Creating user: ${account.email} with role: ${role}`);
      await prisma.user.upsert({
        where: { email: account.email },
        update: {},
        create: {
          name: account.name,
          location: account.location as Locations,
          skills: account.skills as Skill[],
          email: account.email,
          password,
          role,
          image: account.image || 'default-image.jpg',
          interests: account.interests || [],
          companies: {
            create: (account.companies || []).map((companyName: string) => ({
              name: companyName,
              location: Locations.Honolulu,
              salary: 0,
              overview: '',
              jobs: '',
              contacts: '',
              idealSkill: [], // ✅ Correct: must be array, not string
            })),
          },
          // interviews: [] <-- leave out for now unless you have Interview seeded
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
