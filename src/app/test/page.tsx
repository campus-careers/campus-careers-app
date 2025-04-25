import { prisma } from '@/lib/prisma';

export default async function TestDBPage() {
  const skills = await prisma.skillModel.findMany(); // This works if you've run `npx prisma generate`
  return (
    <main>
      <h1>Skills from Supabase (SkillModel model)</h1>
      <ul>
        {skills.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </main>
  );
}
