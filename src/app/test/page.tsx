// eslint-disable-next-line import/no-named-as-default
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Force revalidation on every request
export const revalidate = 0; // Disable static generation

export default async function TestDBPage() {
  // Only try connecting if DATABASE_URL exists
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
