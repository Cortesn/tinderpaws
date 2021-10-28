import transporter from "./transporter.js"

const passwordReset = async (email, resetKey) => {
    const message = {
        from: '"Tinder Paws 🐶" <tinderpaws.info@gmail.com>',
        to: email,
        subject: 'Password reset request',
        // text: 'Hello World',
        html: 
        `<body>
            <b>This is an automated message from Tinder Paws.</b> 
            </br>
            <p>You recently requested to reset your password.</p>
            <p>If you did not request to reset your password, please disregard this email.</p>
            </br>
            <p>If you would like to reset your password please follow this link: <a href="http://${process.env.HOSTNAME}:${process.env.CLIENT_PORT}/resetPassword?email=${email}&reset_key=${resetKey}">reset password</a></p>
        </body> `
    }

    transporter.sendMail(message, (error, response) => {
        if(error){
            console.log(error)
        }
    })
}

export default passwordReset
