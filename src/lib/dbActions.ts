'use server';

import { Company, Locations } from '@prisma/client'; // Ensure Locations enum is imported
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

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
}) {
  await prisma.company.create({
    data: {
      name: company.name,
      salary: company.salary,
      overview: company.overview,
      location: company.location,
      jobs: company.jobs,
      contacts: company.contacts,
      idealSkill: company.idealSkill,
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
      location: company.location,
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
  const password = await hash(credentials.password, 10); // Hash the password for storage

  // Ensure location is a valid Locations enum value
  const validLocation = credentials.location as Locations;

  // Check if the location is valid, otherwise throw an error
  const validLocations: Locations[] = ['Honolulu', 'NewYork', 'SanFrancisco', 'London', 'Tokyo', 'Remote'];
  if (!validLocations.includes(validLocation)) {
    throw new Error('Invalid location');
  }

  // Create the user in the database
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      name: credentials.name,
      image: 'default-image.jpg', // Provide a default value for image
      location: validLocation, // Pass the validLocation here
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10); // Hash the new password
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
