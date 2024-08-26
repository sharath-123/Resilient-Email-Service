# Email Service

## Overview

This project implements a resilient email sending service in JavaScript using Node.js. The service can handle email sending with retries, fallback mechanisms, idempotency, and basic rate limiting. 

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
2 .Install Dependencies

   This project does not require any external libraries, but make sure you have Node.js installed.

3. Run the Email Service

   To test the email service, simply run:
    - node index.js
  
Assumptions
      - The email providers (MockEmailProvider) are mock implementations for demonstration purposes.
      - The sendEmail method includes retry logic with exponential backoff.
      - The service uses idempotency to prevent duplicate emails based on a unique key.
      - Basic rate limiting is not included but can be added based on specific requirements.


-> Unit Tests
      - Unit tests are provided in the test directory using a basic testing framework.

   ### 3. **Unit Tests**  directly check unit test cases in Unit.test.js

Create a simple unit test file to verify the functionality of `EmailService` and `MockEmailProvider`. For this example, I'll use the built-in `assert` module, but you might want to use a more robust framework like Mocha or Jest for real-world applications.

->Install Jest :
     - npm install --save-dev jest.
     - Add Test Script to package.json

        =>     "scripts": {
                   "test": "mocha"
               }

- npm test
