import { IEmailService } from '@/src/application/services/email.service.interface';
import { Email } from '@/src/entities/models/email';

export class MockEmailService implements IEmailService {
  async sendEmail(_: Email): Promise<void> {}
}
