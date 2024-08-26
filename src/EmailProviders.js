class EmailProviders {
    constructor(name){
        this.name = name;
    }

    async sendEmail(emailrequest){
        console.log(`sending email via ${this.name}`);
        //simulate random success/ failures
        if(Math.random() > 0.5){
            console.log(`${this.name} sent the email successfully`);
        } else {
            throw new Error(`${this.name} failed to send email..`);
        }
    }
}

module.exports = { EmailProviders };