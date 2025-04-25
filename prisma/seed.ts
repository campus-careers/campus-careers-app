import { PrismaClient, Skill, Locations, Role } from '@prisma/client'; // Ensure Role is imported
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seeding users
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role = (account.role as Role) || Role.USER; // Ensure Role is used here
      console.log(`  Creating user: ${account.email} with role: ${role}`);
      await prisma.user.upsert({
        where: { email: account.email }, // Ensure email is used as unique identifier
        update: {},
        create: {
          name: account.name,
          location: account.location as Locations,
          skills: account.skills as Skill[],
          email: account.email,
          password,
          role, // Make sure role is correctly passed
          image: account.image || 'default-image.jpg',
          companies: account.companies || [], // Ensure companies field is passed
          interviews: account.interviews || [],
          interests: account.interests || [],
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
