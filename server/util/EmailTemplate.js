
class EmailTemplate {
    static getActivateLinkTemplete(userId) {
        const dynamicURL = "APPLICATION_PAGE_URL_TO_RESET_PASSWORD_ " + userId;
        var template = `<html>
        <head> </head>
        <body> I this is Body</body>
        <h1> This is Header 1</h1>
        <a href="`+dynamicURL+`"> click Here</a>
    </html>`
    console.log(".........",template,"...............");
        return template;
    }
}

module.exports = EmailTemplate;