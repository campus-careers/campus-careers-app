import { PrismaClient, Skill, Locations, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  // Seed users
  const users = [
    {
      email: 'admin@foo.com',
      name: 'Admin User',
      location: Locations.Remote,
      skills: [Skill.JavaScript, Skill.Python],
      interests: ['Leadership', 'Technology'],
      image: 'default-image.jpg',
      role: Role.ADMIN,
      password: 'adminpass',
      category: 'Tech',  // New field
    },
    {
      email: 'john@foo.com',
      name: 'John Doe',
      location: Locations.NewYork,
      skills: [Skill.Python, Skill.Java],
      interests: ['Data Science', 'AI'],
      image: 'default-image.jpg',
      role: Role.USER,
      password: 'changeme', // This is the login password you should test
      category: 'Tech',  // New field
    },
  ];

  await Promise.all(
    users.map(async (user) => {
      const { email, name, location, skills, interests, image, role, password: plainPassword } = user;
      const hashedPassword = await hash(plainPassword, 10);

      await prisma.user.upsert({
        where: { email },
        update: {
          name,
          location,
          skills,
          interests,
          image,
          role,
          password: hashedPassword,
        },
        create: {
          email,
          name,
          location,
          skills,
          interests,
          image,
          password: hashedPassword,
          role,
        },
      });
    }),
  );

  // Seed companies
  const companies = [
    {
      name: 'Google',
      location: Locations.California,
      salary: 150000,
      overview: 'Tech Giant focusing on software development and cloud services.',
      jobs: 'Software Engineer',
      contacts: 'hr@google.com',
      idealSkill: ['JavaScript', 'Python'],
      userId: 1, // Assuming userId 1 is admin
    },
    {
      name: 'Tesla',
      location: Locations.California,
      salary: 140000,
      overview: 'Electric Vehicle Manufacturer and Clean Energy Company.',
      jobs: 'Mechanical Engineer',
      contacts: 'hr@tesla.com',
      idealSkill: ['CPlusPlus', 'Python'],
      userId: 1,
    },
    {
      name: 'Meta',
      location: Locations.California,
      salary: 130000,
      overview: 'Social Media and Virtual Reality Innovator.',
      jobs: 'Data Scientist',
      contacts: 'hr@meta.com',
      idealSkill: ['SQL', 'Python'],
      userId: 1,
    },
  ];

  await Promise.all(
    companies.map(async (company) => {
      await prisma.company.upsert({
        where: { name: company.name },
        update: {
          location: company.location,
          salary: company.salary,
          overview: company.overview,
          jobs: company.jobs,
          contacts: company.contacts,
          idealSkill: company.idealSkill,
          userId: company.userId,
        },
        create: {
          name: company.name,
          location: company.location,
          salary: company.salary,
          overview: company.overview,
          jobs: company.jobs,
          contacts: company.contacts,
          idealSkill: company.idealSkill,
          userId: company.userId,
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
  