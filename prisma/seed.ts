import { PrismaClient, Locations, Skill } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Companies and Users...');

  // Define users to be added (with hashed passwords)
  const users = [
    {
      id: 1,
      email: 'admin@foo.com',
      password: await hash('changeme', 10), // Hash the password properly
      name: 'Admin User',
      location: Locations.Remote,
      skills: [Skill.JavaScript, Skill.Python],
      interests: ['Web Development', 'Leadership'],
      image: 'default-image.jpg',
      major: 'Computer Engineering',
      portfolio: 'https://admin.dev',
    },
    {
      id: 2,
      email: 'john@foo.com',
      password: await hash('changeme', 10), // Hash the password properly
      name: 'John Foo',
      location: Locations.NewYork,
      skills: [Skill.Python, Skill.Ruby],
      interests: ['Data Science', 'Machine Learning'],
      image: 'default-image.jpg',
      major: 'Data Science',
      portfolio: 'https://johnsportfolio.dev',
    },
  ];

  // Insert users into the database
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  // Define companies to be added
  const companies = [
    {
      id: 1,
      name: 'TechCorp',
      location: Locations.Remote,
      salary: 100000,
      overview: 'A leading tech company specializing in web development.',
      jobs: 'Frontend Developer, Backend Developer',
      contacts: 'contact@techcorp.com',
      idealSkill: [Skill.JavaScript, Skill.Python, Skill.Ruby],
      userId: 1,
    },
    {
      id: 2,
      name: 'WebSolutions',
      location: Locations.Remote,
      salary: 120000,
      overview: 'Experts in creating responsive and modern web applications.',
      jobs: 'Full Stack Developer, UI/UX Designer',
      contacts: 'jobs@websolutions.com',
      idealSkill: [Skill.JavaScript, Skill.CSharp, Skill.Java],
      userId: 2,
    },
  ];

  // Insert companies into the database
  for (const company of companies) {
    await prisma.company.upsert({
      where: { id: company.id },
      update: company,
      create: company,
    });
  }

  console.log('✅ Companies and Users seeded');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
  