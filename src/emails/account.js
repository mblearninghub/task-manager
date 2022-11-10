const sgMail = require('@sengrid/mail')
const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

sgMail.send({
    to: 'margaritabarbare@gmail.com',
    from: 'margaritabarbare@gmail.com',
    subject: 'first mail',
    text: 'hope it worked'
})