import { eq } from 'drizzle-orm';

import { db } from '@/drizzle';
import { verificationCodes } from '@/drizzle/schema';
import { IVerificationCodesRepository } from '@/src/application/repositories/verification-codes.repository.interface';
import { DatabaseOperationError } from '@/src/entities/errors/common';
import {
  VerificationCode,
  VerificationCodeInsert,
} from '@/src/entities/models/verification-code';

export class VerificationCodesRepository
  implements IVerificationCodesRepository
{
  async getAllVerificationCodes(): Promise<VerificationCode[]> {
    return [];
  }

  async getVerificationCode(
    code: string
  ): Promise<VerificationCode | undefined> {
    try {
      const verificationCode = await db.query.verificationCodes.findFirst({
        where: eq(verificationCodes.code, code),
      });

      return verificationCode;
    } catch (err) {
      throw new DatabaseOperationError(
        (err as Error).message ?? 'Cannot get verification code.'
      );
    }
  }

  async createVerificationCode(
    input: VerificationCodeInsert
  ): Promise<VerificationCode> {
    try {
      const [created] = await db
        .insert(verificationCodes)
        .values(input)
        .returning();

      if (created) {
        return created;
      } else {
        throw new DatabaseOperationError('Cannot create verification code.');
      }
    } catch (err) {
      throw new DatabaseOperationError(
        (err as Error).message ?? 'Cannot create verification code.'
      );
    }
  }

  async deleteAllVerificationCodesByUserId(userId: string): Promise<void> {
    try {
      await db
        .delete(verificationCodes)
        .where(eq(verificationCodes.userId, userId));
    } catch (err) {
      throw new DatabaseOperationError(
        (err as Error).message ?? 'Cannot delete verification codes.'
      );
    }
  }
}
