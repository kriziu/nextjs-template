import { env } from '@/env';
import { IEmailService } from '@/src/application/services/email.service.interface';
import { EmailService } from '@/src/infrastructure/services/email.service';
import { MockEmailService } from '@/src/infrastructure/services/email.service.mock';

export function getEmailServiceModule(): IEmailService {
  if (env.NODE_ENV === 'test') {
    return new MockEmailService();
  }

  return new EmailService();
}
