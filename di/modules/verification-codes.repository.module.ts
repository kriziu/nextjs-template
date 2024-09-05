import { env } from '@/env';
import { IVerificationCodesRepository } from '@/src/application/repositories/verification-codes.repository.interface';
import { VerificationCodesRepository } from '@/src/infrastructure/repositories/verification-codes.repository';
import { MockVerificationCodesRepository } from '@/src/infrastructure/repositories/verification-codes.repository.mock';

export function getVerificationCodesRepositoryModule(): IVerificationCodesRepository {
  if (env.NODE_ENV === 'test') {
    return new MockVerificationCodesRepository();
  }

  return new VerificationCodesRepository();
}
