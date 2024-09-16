import nodemailer from 'nodemailer'
import { MAIL_HOST, MAIL_PASSWORD, MAIL_USERNAME } from '../config'
export const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000) //30min

    return { otp, expiry }
}

export const onRequestOtp = async (email: string, title: string, body: string) => {
    try {
        // const transporter = nodemailer.createTransport({
        //     service: MAIL_HOST,
        //     secure: true,
        //     auth: {
        //         user: MAIL_USERNAME,
        //         pass: MAIL_PASSWORD,
        //     },
        // })
        // const mailOptions = {
        //     from: MAIL_USERNAME,
        //     to: email,
        //     subject: title,
        //     html: body,
        // }
        // let info = await transporter.sendMail(mailOptions)
        // console.log('Email info: ', info)
        // console.log(info)
        console.log('Otp sent (testing)')
        return true
    } catch (error: any) {
        console.log(error.message)
    }
}
