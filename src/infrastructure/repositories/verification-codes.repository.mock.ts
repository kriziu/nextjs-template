import { IVerificationCodesRepository } from '@/src/application/repositories/verification-codes.repository.interface';
import {
  VerificationCode,
  VerificationCodeInsert,
} from '@/src/entities/models/verification-code';

export class MockVerificationCodesRepository
  implements IVerificationCodesRepository
{
  private _verificationCodes: VerificationCode[];

  constructor() {
    this._verificationCodes = [
      {
        code: '12345678',
        verifyTokenHash: '12345678',
        userId: '1',
        expiresAt: new Date(),
      },
      {
        code: '23456789',
        verifyTokenHash: '23456789',
        userId: '1',
        expiresAt: new Date(),
      },
    ];
  }

  async getAllVerificationCodes(): Promise<VerificationCode[]> {
    return this._verificationCodes;
  }

  async getVerificationCode(
    code: string
  ): Promise<VerificationCode | undefined> {
    const verificationCode = this._verificationCodes.find(
      vc => vc.code === code
    );
    return verificationCode;
  }

  async createVerificationCode(
    input: VerificationCodeInsert
  ): Promise<VerificationCode> {
    this._verificationCodes.push(input);
    return input;
  }

  async deleteAllVerificationCodesByUserId(userId: string): Promise<void> {
    this._verificationCodes = this._verificationCodes.filter(
      vc => vc.userId !== userId
    );
  }
}
