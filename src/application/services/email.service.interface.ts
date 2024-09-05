import { Email } from '@/src/entities/models/email';

export interface IEmailService {
  sendEmail(email: Email): Promise<void>;
}
