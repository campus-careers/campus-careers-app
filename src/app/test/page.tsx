import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function TestDBPage() {
  if (!process.env.DATABASE_URL) {
    return (
      <main>
        <h1>Database URL not set. Cannot fetch data.</h1>
      </main>
    );
  }

  const users = await prisma.user.findMany();

  // Yes
  return (
    <main>
      <h1>Users from Database:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </main>
  );
}
