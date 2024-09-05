import { container } from '@/di';
import { Email } from '@/src/entities/models/email';

export async function sendEmailUseCase(email: Email): Promise<void> {
  const emailService = container.get('EmailService');

  return emailService.sendEmail(email);
}
