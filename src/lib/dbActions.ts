'use server';

import { Company, Student } from '@prisma/client';
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
export async function createUser(credentials: { email: string; password: string }) {
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
 * @param credentials, an object with the following properties:  email, password.
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

/**
 * Edits an existing student in the database.
 */
export async function editStudent(student: Student) {
  await prisma.student.update({
    where: { id: student.id },
    data: {
      name: student.name, // ✅ match schema field
      location: student.location,
      skills: student.skills,
      image: student.image,
      email: student.email,
    },
  });
  redirect('/student/home');
}
