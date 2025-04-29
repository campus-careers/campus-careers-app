/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createPrismaClientWithRetry() {
  const maxRetries = 5;
  const retryDelay = 3000; // 3 seconds
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const client = new PrismaClient();
      await client.$connect();
      console.log('✅ Connected to Prisma on attempt', attempt);
      return client;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed to connect to Prisma`);
      if (attempt === maxRetries) {
        throw error;
      }
      await sleep(retryDelay);
    }
  }
  throw new Error('Prisma connection failed after retries.');
}

export const prisma = globalForPrisma.prisma ?? await createPrismaClientWithRetry();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
// export const prisma = globalForPrisma.prisma || new PrismaClient();
