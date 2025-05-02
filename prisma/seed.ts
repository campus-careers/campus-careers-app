import { PrismaClient, Locations, Skill } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Companies and Users...');

  // Define users to be added (assuming the users don't exist already)
  const users = [
    {
      id: 1,  // Add unique IDs for each user
      email: 'alex@uh.edu',
      password: 'hashedpassword', // Make sure to hash passwords properly
      name: 'Alex Chang',
      location: Locations.Remote,
      skills: [Skill.JavaScript, Skill.Python],
      interests: ['Web Development', 'Machine Learning'],
      image: 'default-image.jpg',
      major: 'Computer Engineering',
      portfolio: 'https://alex.dev',
    },
    {
      id: 2,
      email: 'jane@example.com',
      password: 'hashedpassword', // Make sure to hash passwords properly
      name: 'Jane Doe',
      location: Locations.Remote,
      skills: [Skill.Java, Skill.CSharp],
      interests: ['Backend Development', 'Cloud Computing'],
      image: 'default-image.jpg',
      major: 'Computer Science',
      portfolio: 'https://janedoe.dev',
    },
    {
      id: 3,
      email: 'john@tech.com',
      password: 'hashedpassword', // Make sure to hash passwords properly
      name: 'John Smith',
      location: Locations.NewYork,
      skills: [Skill.Python, Skill.Ruby],
      interests: ['Data Science', 'AI'],
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
      location: Locations.Remote, // Use valid enum values
      salary: 100000,
      overview: 'A leading tech company specializing in web development.',
      jobs: 'Frontend Developer, Backend Developer',
      contacts: 'contact@techcorp.com',
      idealSkill: [Skill.JavaScript, Skill.Python, Skill.Ruby],
      userId: 1,  // Make sure userId exists
    },
    {
      id: 2,
      name: 'WebSolutions',
      location: Locations.Remote, // Use valid enum values
      salary: 120000,
      overview: 'Experts in creating responsive and modern web applications.',
      jobs: 'Full Stack Developer, UI/UX Designer',
      contacts: 'jobs@websolutions.com',
      idealSkill: [Skill.JavaScript, Skill.CSharp, Skill.Java],
      userId: 2,  // Make sure userId exists
    },
    {
      id: 3,
      name: 'DataAnalytics Inc.',
      location: Locations.NewYork, // Use valid enum values
      salary: 95000,
      overview: 'Data-driven solutions for businesses worldwide.',
      jobs: 'Data Scientist, Machine Learning Engineer',
      contacts: 'careers@dataanalytics.com',
      idealSkill: [Skill.Python, Skill.Ruby, Skill.Java],
      userId: 3,  // Make sure userId exists
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
