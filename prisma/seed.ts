import { PrismaClient, Skill, Locations, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10); // Hashing the password

  const users = [
    {
      email: 'admin@foo.com',
      name: 'Admin User',
      location: Locations.Remote,
      skills: [Skill.JavaScript, Skill.Python],
      interests: ['Leadership', 'Technology'],
      image: 'default-image.jpg',
      role: Role.ADMIN,
    },
    {
      email: 'john@foo.com',
      name: 'John Doe',
      location: Locations.NewYork,
      skills: [Skill.Python, Skill.Java],
      interests: ['Data Science', 'AI'],
      image: 'default-image.jpg',
      role: Role.USER,
    },
  ];

  // Upsert users
  await Promise.all(
    users.map(async (user) => {
      const { email, name, location, skills, interests, image, role } = user;

      await prisma.user.upsert({
        where: { email }, // Check by email
        update: {}, // Nothing to update (no need to change any field)
        create: {
          email,
          name,
          location: location as Locations, // Ensure correct enum value for location
          skills: skills as Skill[], // Ensure correct enum values for skills
          interests,
          image,
          password,
          role,
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
  