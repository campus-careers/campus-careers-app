import { prisma } from '@/lib/prisma';

export default async function TestDBPage() {
  const skills = await prisma.skillEntry.findMany();

  return (
    <main>
      <h1>Skills from Supabase (SkillEntry model)</h1>
      <ul>
        {skills.map((s: { id: number; name: string }) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </main>
  );
}
