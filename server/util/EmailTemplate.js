
class EmailTemplate {
    static getActivateLinkTemplete(userId) {
        const dynamicURL = "http://localhost:3000/verifymail?id=" + userId;
        var template = `<html>
                        <head> </head>
                        <body> Please click below link to activate your account. </body>       
                        <a href="${dynamicURL}"> click Here</a>
                    </html>`
        return template;
    }

    static getPasswordResetLinkTemplete(userId){
        const dynamicURL = "http://localhost:3000/resetpassword?id=" + userId;
        var template = `<html>
                            <head> </head>
                            <body> Please click below link to Reset password. </body>       
                            <a href="${dynamicURL}"> click Here</a>
                        </html>`
        return template;
    }
}

module.exports = EmailTemplate;