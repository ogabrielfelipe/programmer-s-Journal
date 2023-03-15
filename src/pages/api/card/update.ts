import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";
import { Request, withAuth } from '@/lib/withAuth';

type updateCard = {
    id: string;
    date: Date;
    title: string;
    finished: boolean;
    color: string;
    description: string;
    userID: string;
}

export default withAuth( async (req: Request, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res.status(403).json({ message: "method not found." });
    }

    const {id, date, title, finished, color, description}: updateCard = req.body;
    const userID = req.auth.user.id;
    if (!userID) return res.status(403).json({ message: "user not found." });

    let dateFormatted = new Date(date);
    try{
        let cardUpdated = await _updateCard({id, date: dateFormatted, title, finished, color, description, userID});
        return res.status(200).json({...cardUpdated});
    }catch(err){
        console.log(err);
        return res.status(500).json({err});
    }
})

async function _updateCard( {id, date, title, finished, color, description, userID}: updateCard ){
    const card = await prisma.card.update({
        where: {
            id
        },
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