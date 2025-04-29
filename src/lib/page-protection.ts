'use server';

import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
import { type Session } from 'next-auth'; // ✅ Import correct type

/**
 * Redirects to the login page if the user is not logged in.
 */
export const loggedInProtectedPage = (session: Session | null) => {
  if (!session?.user?.email) {
    redirect('/auth/signin');
  }
};

/**
 * Redirects to home page if user is not an admin.
 */
export const adminProtectedPage = (session: Session | null) => {
  loggedInProtectedPage(session);
  if (session?.user?.randomKey !== Role.ADMIN) {
    redirect('/'); // ✅ send to homepage
  }
};
