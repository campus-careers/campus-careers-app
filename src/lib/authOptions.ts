/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@foo.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        console.log('🔵 Attempting login for:', credentials.email);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('❌ User not found:', credentials.email);
          return null;
        }

        console.log('✅ Found user:', user.email);

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          console.log('❌ Invalid password for:', credentials.email);
          return null;
        }

        console.log('✅ Password is valid for:', user.email);

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          randomKey: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as { id: string; randomKey: string };
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
