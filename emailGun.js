/*

SMTP Hostname: smtp.mailgun.org
Port: 587 (recommended)
Username: postmaster@sandbox6389b9880a9b48f6a82e58ddc27066ca.mailgun.org
Default Password: a04f797c1418f7b3e59949a7f2231ead-de7062c6-8632e69f Manage SMTP credentials


API KEY : 73a310933834aeefcf34c9135e95f6ba-de7062c6-4156a8c0
Domain  : sandbox6389b9880a9b48f6a82e58ddc27066ca.mailgun.org


*/


var API_KEY = '27ebc1d1e7703185ac096fe9003e2966-de7062c6-bee4baf4';
var DOMAIN = 'sandboxe504238a8eab4f49a1750d1dce96609f.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

const data = {
    from: 'pandeyaniket546@gmail.com',
    to: 'pandeyaniket546@gmail.com',
    subject: 'Test',
    html: `<html>
        <head> </head>
        <body> I this is Body</body>
        <h1> This is Header 1</h1>
        <a href="www.google.com"> click Here</a>
    </html>`
};

mailgun.messages().send(data, (error, body) => {
    console.log("error...", error);
    console.log(body);
});
