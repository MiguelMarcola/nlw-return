import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mailAdapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f03f9e0d7b37e8",
        pass: "601861b1277893"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
    async sendMain({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Miguel Marçola <miguelmarcola@gmail.com>",
            subject,
            html: body
        })
    }
}