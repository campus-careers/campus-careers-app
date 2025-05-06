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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('❌ User not found:', credentials.email);
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          console.log('❌ Invalid password for:', credentials.email);
          return null;
        }

        // Return user data along with id and randomKey
        return {
          id: `${user.id}`,
          name: user.name,
          email: user.email,
          randomKey: user.role, // saving role here as randomKey
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as { id: string; randomKey: string };
        return {
          ...token,
          id: u.id, // Add user id to JWT
          randomKey: u.randomKey, // Add randomKey to JWT
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id; // Add id to session user
      session.user.randomKey = token.randomKey; // Add randomKey to session user
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
