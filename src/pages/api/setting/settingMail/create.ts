import prisma from "@/lib/prisma";
import { Request, withAuth } from "@/lib/withAuth";
import { NextApiResponse } from "next/types";

import ini from "ini";
import fs from "fs";
import path from "path";



type createMail = {
    typeMail: "zoho";
    host: string;
    port: number;
    secure: boolean;
    mailOptionsFrom: string;
    username: string;
    password: string;
}


export default withAuth(async (req: Request, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(403).json({ message: "method not found." });
    }

    const {host, mailOptionsFrom, password, port, secure, typeMail, username}: createMail = req.body;
    try{

        const [
            settingCreated,
            preferenceMail
        ] = await Promise.all([
            _create({host, mailOptionsFrom, password, port, secure, typeMail, username}),
            _createPreference(typeMail)
        ])        
        if (!preferenceMail) { 
            _deleteSetting(settingCreated.id)
            return res.status(403).json({message: "Setting is not created."});
        }
        return res.status(200).json(settingCreated);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err});
    }

})


async function _create( {host, mailOptionsFrom, password, port, secure, typeMail, username}: createMail ){
    const setting = await prisma.settingMail.create({
        data: {
            host,
            mailOptionsFrom,
            password,
            port,
            secure,
            username,
            typeMail
        },
        select: {
            id: true,
        }
    });

    return setting;
}

async function _createPreference(typeMail: string){
    try{
        const setting = ini.parse(fs.readFileSync(path.resolve(path.resolve(__dirname, "..", "..", "..", "..", "..","..", "settings.ini")), 'utf8'));
        setting.mail.preference = typeMail;
        fs.writeFileSync(path.resolve(path.resolve(__dirname, "..", "..", "..", "..", "..","..", "settings.ini")), ini.stringify(setting) )
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

async function _deleteSetting(id: string){
    try{
        await prisma.settingMail.delete({
            where:{
                id
            }
        })
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}