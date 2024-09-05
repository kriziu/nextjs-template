import {
  VerificationCode,
  VerificationCodeInsert,
} from '@/src/entities/models/verification-code';

export interface IVerificationCodesRepository {
  getAllVerificationCodes(): Promise<VerificationCode[]>; // Used for testing
  getVerificationCode(code: string): Promise<VerificationCode | undefined>;
  createVerificationCode(
    input: VerificationCodeInsert
  ): Promise<VerificationCode>;
  deleteAllVerificationCodesByUserId(userId: string): Promise<void>;
}
