import { prisma } from '@/lib/prisma';

export default async function TestDBPage() {
  const skills = await prisma.skillModel.findMany(); // Updated to reflect the renamed model

  return (
    <main>
      <h1>Skills from Supabase (SkillModel model)</h1>
      {' '}
      {/* Updated to reflect the renamed model */}
      <ul>
        {skills.map((s: { id: number; name: string }) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </main>
  );
}
