'use server';

import { Company, Locations } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import prisma from './prisma';

/**
 * Adds a new company to the database.
 */
export async function addCompany(company: {
  name: string;
  salary: number;
  overview: string;
  location: string;
  jobs: string;
  contacts: string;
  idealSkill: string[];
  userId: number; // ✅ ADD userId to input
}) {
  const validLocation = company.location as Locations;

  const validLocations: Locations[] = ['Honolulu', 'NewYork', 'SanFrancisco', 'London', 'Tokyo', 'Remote'];
  if (!validLocations.includes(validLocation)) {
    throw new Error(`Invalid location provided: ${company.location}`);
  }

  await prisma.company.create({
    data: {
      name: company.name,
      salary: company.salary,
      overview: company.overview,
      location: validLocation,
      jobs: company.jobs,
      contacts: company.contacts,
      idealSkill: company.idealSkill,
      user: { connect: { id: company.userId } }, // ✅ Correct: connect Company to User
    },
  });

  redirect('/list');
}

/**
 * Edits an existing company in the database.
 */
export async function editCompany(company: Company) {
  await prisma.company.update({
    where: { id: company.id },
    data: {
      name: company.name,
      salary: company.salary,
      overview: company.overview,
      location: company.location as Locations, // ✅ explicitly cast here
      jobs: company.jobs,
      contacts: company.contacts,
      idealSkill: company.idealSkill,
    },
  });

  redirect('/list');
}

/**
 * Deletes an existing company from the database.
 */
export async function deleteCompany(id: number) {
  await prisma.company.delete({
    where: { id },
  });

  redirect('/list');
}

/**
 * Creates a new user in the database.
 */
export async function createUser(credentials: { email: string; password: string; name: string; location: string }) {
  const password = await hash(credentials.password, 10);

  const validLocation = credentials.location as Locations;

  const validLocations: Locations[] = ['Honolulu', 'NewYork', 'SanFrancisco', 'London', 'Tokyo', 'Remote'];
  if (!validLocations.includes(validLocation)) {
    throw new Error('Invalid location');
  }

  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      name: credentials.name,
      image: 'default-image.jpg',
      location: validLocation,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
