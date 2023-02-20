import prisma from '@/lib/prisma';
import { verify } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

interface PayLoad{
    sub: string,
    type: string
}


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'GET'){
        return res.status(403).json({ message: "method not found." });
    }
    const authToken = req.headers.authorization;
    
    if (!authToken) {
        return res.status(404).json({msg: "Token not found"});
    }
    const [, token] = authToken.split(" ");
    const { sub, type} = verify(token, process.env.SECRET_KEY!) as PayLoad;


    try{
        const user = await _getUserById(sub);
        return res.status(200).json(user);
    }catch(err){
        return res.status(404).json({msg: "user not found"});
    }

    
}

async function _getUserById(id: string){
    return await prisma.user.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
        }
    })
}