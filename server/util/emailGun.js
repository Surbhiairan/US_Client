const EmailTemplate = require('./EmailTemplate');
const config = require('../config/env/index');
var API_KEY = config.emailGun.API_KEY;
var DOMAIN = config.emailGun.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

class EmailGun{

    static sendEmail(dynamicURL,to,subject){
        // hard coded temporarily
        //to = 'surbhiairan1@gmail.com';
        const data = {
            from: config.emailGun.from,
            to: to,
            subject: subject,
            template: "email_verification",
	        'h:X-Mailgun-Variables': {redirect: dynamicURL}
        };
        return new Promise( (resolve,reject) => {
            mailgun.messages().send(data, (err, body) => {                
               if(err){
                reject(err)
               }else{
                resolve(body)
               }
            });
        });
        
    }
    static sendActivationLink(id,email){
        const subject = "Account Activation Link :: Post Curve";
        const dynamicURL = "http://localhost:5000/verifymail?id=" + userId;
        //let template = EmailTemplate.getActivateLinkTemplete(id,email);
        return EmailGun.sendEmail(dynamicURL,email,subject);
    }

    static sendPasswordResetLink(id,email){
        const subject = "Password Reset Link :: Post Curve";
        const dynamicURL = "http://localhost:5000/verifymail?id=" + userId;
        //let template = EmailTemplate.getPasswordResetLinkTemplete(id,email);
        return EmailGun.sendEmail(dynamicURL,email,subject);
    }

}

module.exports = EmailGun;