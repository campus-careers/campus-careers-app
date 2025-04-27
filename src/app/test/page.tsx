'use client';

// import { prisma } from '@/lib/prisma';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
}

export default function TestDBPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/test');
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

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

// export default async function TestDBPage() {
//   // Only try connecting if DATABASE_URL exists
//   if (!process.env.DATABASE_URL) {
//     return (
//       <main>
//         <h1>Database URL not set. Cannot fetch data.</h1>
//       </main>
//     );
//   }

//   const users = await prisma.user.findMany();

//   return (
//     <main>
//       <h1>Users from Database:</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.email}</li>
//         ))}
//       </ul>
//     </main>
//   );
// }
