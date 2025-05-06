import { PrismaClient, Skill, Locations, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

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
    },
    {
      email: 'john@foo.com',
      name: 'John Doe',
      location: Locations.NewYork,
      skills: [Skill.Python, Skill.Java],
      interests: ['Data Science', 'AI'],
      image: 'default-image.jpg',
      role: Role.USER,
      password: 'changeme', // this is the login password you should test
    },
  ];

  await Promise.all(
    users.map(async (user) => {
      const { email, name, location, skills, interests, image, role, password: plainPassword } = user;

      const hashedPassword = await hash(plainPassword, 10);

      await prisma.user.upsert({
        where: { email },
        update: {},
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

  console.log('✅ Seeding complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
  