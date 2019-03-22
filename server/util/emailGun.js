const EmailTemplate = require('./EmailTemplate');
const config = require('../config/env/index');
var API_KEY = config.emailGun.API_KEY;
var DOMAIN = config.emailGun.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

class EmailGun{

    static sendEmail(content,to){
        // hard coded temporarily
        to = 'pandeyaniket546@gmail.com';
        const data = {
            from: config.emailGun.from,
            to: to,
            subject: 'RESET PASSWORD :: POST CURVE',
            html: content
        };
        return new Promise( (resolve,reject) => {
            mailgun.messages().send(data, (err, body) => {                
               if(err){
                console.log("err..........",err);
                reject(err)
               }else{
                resolve(body)
               }
            });
        });
        
    }
    static sendActivationLink(id,email){
        let template = EmailTemplate.getActivateLinkTemplete(id,email);
        return EmailGun.sendEmail(template,email);
    }

}

module.exports = EmailGun;