'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function addSkill(formData: FormData) {
  const name = formData.get('skill') as string;
  if (name) {
    await prisma.skill.create({ data: { name } });
    revalidatePath('/admin');
  }
}

export async function deleteSkill(id: number) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath('/admin');
}

export async function deleteSkillAction(id: number) {
  return deleteSkill(id);
}

export async function addLocation(formData: FormData) {
  const name = formData.get('location') as string;
  if (name) {
    await prisma.location.create({ data: { name } });
    revalidatePath('/admin');
  }
}

export async function deleteLocation(id: number) {
  await prisma.location.delete({ where: { id } });
  revalidatePath('/admin');
}

export async function deleteLocationAction(id: number) {
  return deleteLocation(id);
}
