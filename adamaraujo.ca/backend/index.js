require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
const port = process.env.PORT || 3001
const username = process.env.address
const password = process.env.password
const sendMailTo = process.env.email
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: username,
            pass: password,
        }
    })
    transporter.verify((error, success) => {
        if (error)
        console.log(error)
        else 
        console.log("Server ready to send emails")
    })

app.listen(port, () => {
    console.log(`Listening to PORT ${port}`)

})
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.post('/email', (request, response) => {
    let email = request.body.msg
        let message = {
        from: username,
        to: sendMailTo,
        subject: email.subject,
        text: email.message,
        html: `<h1> Portfolio Website Form Email from ${email.name} </h1>
        <p> ${email.message} </p>
        <p> From: ${email.email} </p>
        `
    }
    try{
        let info = transporter.sendMail({
        from: message.from,
        to: message.to,
        subject: "IMPORTANT FROM PORTFOLIO SITE " + message.subject,
        text: message.text,
        html: message.html
    }).then(response.status(200)).catch((err) => {
        console.log("ERROR OCCURRED");
        console.log(err)
        response.status(400)
    })
    } catch (err) {
        response.status(400)
    }
    console.log("SENT");
})