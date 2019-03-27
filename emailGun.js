/*

SMTP Hostname: smtp.mailgun.org
Port: 587 (recommended)
Username: postmaster@sandbox6389b9880a9b48f6a82e58ddc27066ca.mailgun.org
Default Password: a04f797c1418f7b3e59949a7f2231ead-de7062c6-8632e69f Manage SMTP credentials


API KEY : 73a310933834aeefcf34c9135e95f6ba-de7062c6-4156a8c0
Domain  : sandbox6389b9880a9b48f6a82e58ddc27066ca.mailgun.org


*/


var API_KEY = '7f05b95ca46b614ab9ebd9db0a5e49a5-e51d0a44-51e61d9a';
var DOMAIN = 'sandbox519db95c578348ac83baad04b70a4323.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

const link = "www.google.com";
const data = {
    from: 'sada.mandal101@gmail.com',
    to: 'sada.mandal101@gmail.com',
    subject: 'Test',
    html: `<html>
        <head> </head>
        <body> I this is Body</body>
        <h1> This is Header 1</h1>
        <a href="${link}"> click Here</a>
    </html>`
};

mailgun.messages().send(data, (error, body) => {
    console.log("error...", error);
    console.log(body);
});
