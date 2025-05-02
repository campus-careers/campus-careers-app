import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Students...');

  await prisma.student.createMany({
    data: [
      {
        name: 'Alex Chang',
        email: 'alex@uh.edu',
        skills: ['JavaScript', 'Python'],
        location: 'Hawaii',
        interests: ['Web Development', 'Machine Learning'],
        image: 'default-image.jpg',
        companies: [],
        interviews: [],
        major: 'Computer Engineering',
        portfolio: 'https://alex.dev',
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        skills: ['Java', 'C++'],
        location: 'California',
        interests: ['Backend', 'Cybersecurity'],
        image: 'default-image.jpg',
        companies: [],
        interviews: [],
        major: 'Computer Science',
        portfolio: 'https://janedoe.dev',
      },
    ],
  });

  console.log('✅ Students seeded');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
