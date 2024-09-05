export function verificationCodeEmailTemplate(code: string) {
  return {
    subject: 'Your Login Code for Nextjs Template',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Login Code for Nextjs Template</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4a4a4a; text-align: center;">Your Login Code for Nextjs Template</h1>
        <p style="text-align: center; font-size: 18px;">Here's your login code:</p>
        <p style="font-size: 36px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 20px 0; padding: 10px; background-color: #f0f0f0; display: block;">
          ${code}
        </p>
        <p style="text-align: center;">Please enter this code to log in to your Nextjs Template account.</p>
        <p style="text-align: center; font-size: 14px; color: #666; margin-top: 30px;">
          If you didn't request this code, please ignore this email or contact support if you have concerns.
        </p>
      </body>
      </html>
    `,
    text: `
Your Login Code for Nextjs Template

Here's your login code: ${code}

Please enter this code to log in to your Nextjs Template account.

If you didn't request this code, please ignore this email or contact support if you have concerns.
    `,
  };
}
