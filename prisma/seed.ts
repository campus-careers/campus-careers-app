import { PrismaClient, Role, Skill, Locations } from '@prisma/client'; // ✅ Add Locations here
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seeding users
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role = (account.role as Role) || Role.USER;
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
          role,
          image: account.image || 'default-image.jpg',
          companies: account.companies || [],
          interviews: account.interviews || [],
          interests: account.interests || [],
        },
      });
    }),
  );

  // Seeding companies (adminList)
  await Promise.all(
    config.defaultCompanies.map(async (company) => {
      console.log(`  Adding Company: ${JSON.stringify(company)}`);
      await prisma.adminList.upsert({
        where: { email: company.email || 'default-email@example.com' }, // Using email for uniqueness
        update: {},
        create: {
          name: company.name,
          skills: company.skills as Skill[],
          location: company.location as Locations,
          interviews: company.interviews || [],
          image: company.image || 'default-image.jpg',
          interests: company.interests || [],
          email: company.email || 'default-email@example.com', // Ensure email is set
        },
      });
    }),
  );

  // Seeding students
  await Promise.all(
    config.defaultData.map(async (student) => {
      console.log(`  Adding Student: ${student.name}`);
      await prisma.student.upsert({
        where: { email: student.email || 'default-email@example.com' }, // Ensuring email exists
        update: {},
        create: {
          name: student.name,
          skills: student.skills,
          location: student.location,
          companies: student.companies,
          interviews: student.interviews,
          interests: student.interests,
          image: student.image || 'default-student-image.jpg',
          email: student.email || 'default-email@example.com', // Ensuring email exists
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
