import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Students...');

  const students = [
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
  ];

  // Using Promise.all to run all the insert operations concurrently
  await Promise.all(
    students.map((student) => prisma.student.upsert({
      where: { email: student.email },
      update: student, // In case the student already exists, update the record
      create: student, // If the student doesn't exist, create a new record
    })),
  );

  console.log('✅ Students seeded');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
