import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { withAuth } from '@/lib/withAuth';

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    created_at: Date;
}

type Data<User> = {
    message?: string
}

interface CreateUserRequest {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export default withAuth( async (req: NextApiRequest, res: NextApiResponse) =>{
    if (req.method !== 'POST') {
        return res.status(403).json({ message: "method not found." });
    }

    const { firstName, lastName, email, password } = req.body;

    let passwordHash = await hash(password, 8);
    try{    
        const userCreated: User = await _createUser({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: passwordHash
        })

        return res.status(200).json({...userCreated})
    }catch(err){
        return res.status(500).json({message: err})
    }  
})


async function _createUser({ firstName, lastName, email, password }: CreateUserRequest) {
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password
        },
        select:{
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            created_at: true,
        }
    })

    return user;
}
