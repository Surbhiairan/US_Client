
class EmailTemplate {
    static getActivateLinkTemplete(userId) {
        const dynamicURL = "click Here " + userId;
        return `
        <html>
        <head>
            <style src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"> </style>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        </head>
        <body>
            <button type="button" class="btn btn-primary">Primary</button>
            <a herf="${dynamicURL}"> Please click here to activate your Profile</a> or open below URL in your browser.
        </body>
        </html>
        `
    }
}

module.exports = EmailTemplate;