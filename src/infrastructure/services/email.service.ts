import nodemailer, { type Transporter } from 'nodemailer';

import { env } from '@/env';
import { IEmailService } from '@/src/application/services/email.service.interface';
import { EmailSendError } from '@/src/entities/errors/email';
import { Email } from '@/src/entities/models/email';

export class EmailService implements IEmailService {
  private _transporter: Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      service: 'gmail', // Change to your service
      secure: true,
      host: env.EMAIL_SERVER_HOST,
      port: env.EMAIL_SERVER_PORT,
      auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD,
      },
    });
  }

  async sendEmail({ to, subject, html, text }: Email): Promise<void> {
    try {
      await this._transporter.sendMail({
        to,
        subject,
        html,
        text,
        from: env.EMAIL_FROM,
      });
    } catch (error) {
      throw new EmailSendError(
        (error as Error).message ?? 'Failed to send email.'
      );
    }
  }
}
