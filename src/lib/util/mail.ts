import nodemailer from "nodemailer";
import path from "path";
import ini from "ini";
import fs from "fs";
import prisma from "../prisma";


export const TransporterMail = async () => {
    let settingsMail = await findSettingsMail();
    
    if (!settingsMail) return false;
    
    return nodemailer.createTransport({
        host: settingsMail.host,
        secure: settingsMail.secure,
        port: settingsMail.port,
        auth: {
            user: settingsMail.username,
            pass: settingsMail.password
        },
    })
}


export async function findSettingsMail(){
    const setting = ini.parse(fs.readFileSync(path.resolve(path.resolve(__dirname, "..", "..", "..", "..", "..", "settings.ini")), 'utf8'));

    return await prisma.settingMail.findFirst({
        where:{
            typeMail: setting.mail.preference
        },
        select:{
            host: true,
            password: true,
            secure: true,
            port: true,
            typeMail: true,
            username: true,
            mailOptionsFrom: true,
        }
    })
}
