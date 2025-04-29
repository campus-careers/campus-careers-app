'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function addskillEntry(formData: FormData) {
  const name = formData.get('skillEntry') as string;
  if (name) {
    await prisma.skillEntry.create({ data: { name } });
    revalidatePath('/admin');
  }
}

export async function deleteskillEntry(id: number) {
  await prisma.skillEntry.delete({ where: { id } });
  revalidatePath('/admin');
}

export async function deleteskillEntryAction(id: number) {
  return deleteskillEntry(id);
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
