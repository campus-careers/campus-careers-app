import { prisma } from '@/lib/prisma';

export default async function TestDBPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      skills: true, // Enum array will be fetched here
    },
  });

  return (
    <main>
      <h1>Users with Skills</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            :
            {user.skills.join(', ')}
            {' '}
            {/* Join the skills array */}
          </li>
        ))}
      </ul>
    </main>
  );
}
