const EmailTemplate = require('./EmailTemplate');
const config = require('../config');
var API_KEY = config.EmailGun.API_KEY;
var DOMAIN = config.EmailGun.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

class EmailGun{

    static sendEmail(content,to){
        to = 'pandeyaniket546@gmail.com';
        const data = {
            from: config.EmailGun.from,
            to: to,
            subject: 'Test',
            html: content
        };
        return new Promise( (resolve,reject) => {
            mailgun.messages().send(data, (error, body) => {
               if(err){
                resolve(body)
               }else{
                reject(error)
               }
            });
        });
        
    }
    static sendActivationLink(userId){
        
    }

}

module.exports = EmailGun;