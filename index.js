const { EmailService } = require('./src/EmailService');
const { EmailProviders } = require('./src/EmailProviders');

const provider1 = new EmailProviders('Provider1');
const provider2 = new EmailProviders('Provider2');
const emailService = new EmailService([provider1, provider2]);

emailService.sendEmail({
    to: 'recipient@example.com',
    subject: 'Hello',
    body: 'This is a test email.',
    idempotencyKey: 'unique-key-123'
}).then(response => {
    console.log(response);
}).catch(error => {
    console.error('Error:', error.message);
});