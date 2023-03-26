import { findSettingsMail, TransporterMail } from "@/lib/util/mail";
import { Request, withAuth } from "@/lib/withAuth";
import type { NextApiResponse } from 'next';
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";


type SendMail = {
    to: string,
    subject: string,
    text: string,
    html: string
}

export default withAuth(async (req: Request, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(403).json({ message: "method not found." });
    }
    const {html, subject, text, to}: SendMail = req.body;
    
    let from = await findSettingsMail();
    

    let mailOptions = {
        from: `"${from?.mailOptionsFrom} - ${req.auth.user["name"]}" ${from?.username}`,
        to: to,
        subject: subject,
        text: text,
        html: html,
    }


    let transporter = await TransporterMail();
    if (!transporter) return res.status(500).json({ message: "is not possible factory connection." });


    (transporter as Transporter<SMTPTransport.SentMessageInfo>).sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: "unsent mail." })
        }
        return res.status(200).json({ message: "sent mail.", info})
    })
})