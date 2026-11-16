import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export async function recordOr404<T>(operation: Promise<T>): Promise<NonNullable<T>> {
  try {
    const record = await operation;
    if (record == null) throw new NotFoundException();
    return record;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && ['P2018', 'P2025'].includes(error.code)) {
      throw new NotFoundException();
    }
    throw error;
  }
}
