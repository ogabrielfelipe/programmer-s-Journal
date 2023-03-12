import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";
import { Request, withAuth } from '@/lib/withAuth';

type createCard = {
    date: string;
    title: string;
    finished: boolean;
    color: string;
    description: string;
    userID: string;
}

export default withAuth( async (req: Request, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(403).json({ message: "method not found." });
    }

    console.log(req);
    const {date, title, finished, color, description}: createCard = req.body;
    const userID = req.auth.user.id;
    if (!userID) return res.status(403).json({ message: "user not found." });


    try{
        let cardCreated = await _createCard({date, title, finished, color, description, userID});
        return res.status(200).json({...cardCreated});
    }catch(err){
        console.log(err);
        return res.status(500).json({err});
    }
})

async function _createCard( {date, title, finished, color, description, userID}: createCard ){
    const card = await prisma.card.create({
        data: {
            date: date,
            title: title,
            color: color,
            finished: finished,
            description: description,
            user_id: userID
        },
        select: {
            id: true,
            date: true,
            title: true,
            description: true,
            finished: true,
            color: true,
            user: {
                select: {
                    id: true,
                    email: true,
                }
            }
        }
    })

    return card
}