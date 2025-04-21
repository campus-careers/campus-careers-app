'use server';

import { Company, Skills } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new company to the database.
 * @param company, an object with the following properties: name, overview, location, jobs, contacts.
 */
// eslint-disable-next-line max-len
export async function addCompany(company: { name: string; salary: number; overview: string; location: string; jobs: string; contacts: string; idealSkill: Skills[] }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
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
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing company in the database.
 * @param company, an object with the following properties: name, overview, location, jobs, contacts.
 */
export async function editCompany(company: Company) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.company.update({
    where: { id: company.id },
    data: {
      name: company.name,
      salary: company.salary,
      overview: company.overview,
      location: company.location,
      jobs: company.jobs,
      contacts: company.contacts,
      // idealSkill: company.idealSkill,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing company from the database.
 * @param id, the id of the company to delete.
 */
export async function deleteCompany(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.company.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
