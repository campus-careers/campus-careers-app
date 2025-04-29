'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

/** Automatically sign out when visiting /auth/signout */
const SignOutPage = () => {
  useEffect(() => {
    // Automatically trigger sign out when page loads
    signOut({ callbackUrl: '/', redirect: true });
  }, []);

  return (
    <div className="text-center py-5">
      <h2>Signing you out...</h2>
    </div>
  );
};

export default SignOutPage;
