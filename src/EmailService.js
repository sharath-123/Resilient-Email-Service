class EmailService {
    constructor(providers) {
        this.providers = providers; // List of email providers
        this.sentEmails = new Set(); // Track sent emails using idempotency key
    }

    // Main method to send email with fallback and retry mechanisms
    async sendEmail(emailRequest) {
        const { idempotencyKey } = emailRequest;

        // Idempotency check: avoid duplicate sends
        if (this.sentEmails.has(idempotencyKey)) {
            console.log('Duplicate email detected, skipping...');
            return { success: true, message: 'Duplicate email, already sent.' };
        }

        // Try sending email with each provider
        for (const provider of this.providers) {
            try {
                // Use sendWithRetry for retry logic
                await this.sendWithRetry(provider, emailRequest);
                this.sentEmails.add(idempotencyKey); // Mark email as sent
                console.log('Email sent successfully.');
                return { success: true, message: 'Email sent successfully.' };
            } catch (error) {
                console.log(`Error sending email with provider: ${error.message}`);
                // Log failure and move to the next provider
            }
        }

        // If all providers fail, return a failure response
        return { success: false, message: 'All providers failed to send email.' };
    }

    // Retry logic with exponential backoff
    async sendWithRetry(provider, emailRequest, maxRetries = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await provider.sendEmail(emailRequest); // Attempt to send email
                return; // Success, exit the function
            } catch (error) {
                console.log(`Attempt ${attempt} failed with ${provider.name}. Retrying...`);
                if (attempt < maxRetries) {
                    await this.delay(delay); // Wait before retrying
                    delay *= 2; // Exponential backoff
                }
            }
        }
        throw new Error('All retry attempts failed for provider ' + provider.name);
    }

    // Utility function to introduce a delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = { EmailService };
