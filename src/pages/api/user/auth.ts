import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

type User = {
    id: string;
    email: string;
    password: string;
}

type UserRes = {
    id: string;
    email: string;
    token: string;
}

type Data<UserRes> = {
    message?: string
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
    if (req.method !== 'POST') {
        return res.status(403).json({ message: "method not found." });
    }

    const {email, password} = req.body;

    const user: User | any = await _findUserByEmail(email);
    if (!user?.email){
        return res.status(404).json({message: 'Email not found.'});
    }

    let verifyPass = await _verifyPassword(password, user.password)
    if (!verifyPass){
        return res.status(401).json({message: 'Password is incorrect.'});
    }

    const token = _generateToken(user.id, user.email)
    return res.status(200).json({id: user.id, email: user.email, token: token})

}

async function _findUserByEmail(email: string) {
    try{
        return await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                password: true
    
            }
        })
    }catch(err){
        return err
    }
    
}

async function _verifyPassword(passwordReq: string, password: string) {
    return await compare(passwordReq, password)
}

function _generateToken(id: string, email: string){
    return sign(
        {
            id: id,
            email: email
        },
        process.env.SECRET_KEY!,
        {
            subject: id,
            expiresIn: '15d'
        }
    )
}