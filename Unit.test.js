
### 3. **Unit Tests**

Create a simple unit test file to verify the functionality of `EmailService` and `MockEmailProvider`. For this example, I'll use the built-in `assert` module, but you might want to use a more robust framework like Mocha or Jest for real-world applications.

#### **3.1 Test Setup**

Create a `test` directory and add a file named `emailService.test.js`.

**`test/emailService.test.js`**

```javascript
// test/emailService.test.js

const assert = require('assert');
const { EmailService } = require('../src/EmailService');
const { MockEmailProvider } = require('../src/MockEmailProvider');

describe('EmailService', function() {
    it('should send an email successfully with a provider', async function() {
        const provider = new MockEmailProvider('Provider1');
        const emailService = new EmailService([provider]);

        const emailRequest = {
            to: 'recipient@example.com',
            subject: 'Test Email',
            body: 'This is a test email.',
            idempotencyKey: 'test-key'
        };

        const response = await emailService.sendEmail(emailRequest);
        assert.strictEqual(response.success, true);
        assert.strictEqual(response.message, 'Email sent successfully.');
    });

    it('should retry and fallback to the next provider on failure', async function() {
        const failingProvider = new MockEmailProvider('FailingProvider');
        const succeedingProvider = new MockEmailProvider('SucceedingProvider');
        const emailService = new EmailService([failingProvider, succeedingProvider]);

        const emailRequest = {
            to: 'recipient@example.com',
            subject: 'Test Email',
            body: 'This is a test email.',
            idempotencyKey: 'test-key'
        };

        const response = await emailService.sendEmail(emailRequest);
        assert.strictEqual(response.success, true);
        assert.strictEqual(response.message, 'Email sent successfully.');
    });

    it('should handle failure from all providers', async function() {
        const failingProvider1 = new MockEmailProvider('FailingProvider1');
        const failingProvider2 = new MockEmailProvider('FailingProvider2');
        const emailService = new EmailService([failingProvider1, failingProvider2]);

        const emailRequest = {
            to: 'recipient@example.com',
            subject: 'Test Email',
            body: 'This is a test email.',
            idempotencyKey: 'test-key'
        };

        const response = await emailService.sendEmail(emailRequest);
        assert.strictEqual(response.success, false);
        assert.strictEqual(response.message, 'All providers failed to send email.');
    });
});
