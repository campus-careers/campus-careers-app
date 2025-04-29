import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

async function createPrismaClientWithRetry(retries = 5, delay = 2000): Promise<PrismaClient> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const client = new PrismaClient();
      await client.$connect();
      console.log('✅ Prisma connected');
      return client;
    } catch (err) {
      console.error(`❌ Prisma connection failed (attempt ${attempt + 1}/${retries})`);
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay)); // wait before retry
      } else {
        throw err; // give up
      }
    }
  }
  throw new Error('Failed to connect Prisma after retries');
}

export const prisma = globalForPrisma.prisma ?? await createPrismaClientWithRetry();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
