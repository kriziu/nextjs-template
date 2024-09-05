import { container } from '@/di';

export async function deleteUserVerificationCodesUseCase(
  userId: string
): Promise<void> {
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );

  await verificationCodesRepository.deleteAllVerificationCodesByUserId(userId);
}
