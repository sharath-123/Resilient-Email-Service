const { EmailService } = require('../src/EmailService');
const {EmailProviders} = require('../src/EmailProviders');

test('should send email successfully', async () => {
    const provider1 = new EmailProviders('Provider1');
    const provider2 = new EmailProviders('Provider2');
    const emailService = new EmailService([provider1, provider2]);

    const response = await emailService.sendEmail({
        to: 'test@example.com',
        subject: 'Test Email',
        body: 'Hello, this is a test email.',
        idempotencyKey: 'unique-key-1'
    });

     expect(response.success).toBe(true);
});