import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";
import { Request, withAuth } from '@/lib/withAuth';
import moment from 'moment';

export default withAuth( async (req: Request, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(403).json({ message: "method not found." });
    }
    const userID = req.auth.user.id
    const { dateInitial, dateFinal } = req.body;
    try{
        const cards = await _getCardsByDates(new Date(dateInitial), new Date(dateFinal), userID);
        return res.status(200).json(cards);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }    
})

async function _getCardsByDates( dateInitial: Date, dateFinal: Date, userID: string ){
    const cards = await prisma.card.findMany({
        where:{
            AND: [
                { date: { gte: dateInitial } },
                { date: { lte: dateFinal }},
                { user_id: userID }
            ]
        },
        select:{
            id: true,
            date: true,
            title: true,
            finished: true,
            color: true,
            description: true
        }
    });
    return cards;

}