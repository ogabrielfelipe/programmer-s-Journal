import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";
import { Request, withAuth } from '@/lib/withAuth';


export default withAuth( async (req: Request, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        return res.status(403).json({ message: "method not found." });
    }

    const id = req.query.id;
    const userID = req.auth.user.id;
    if (!userID) return res.status(403).json({ message: "user not found." });

    try{
        let cardCreated = await _deleteCard(id as string);
        return res.status(200).json({...cardCreated});
    }catch(err){
        console.log(err);
        return res.status(500).json({err});
    }
})

async function _deleteCard( id: string ){
    const card = await prisma.card.delete({
        where:{
            id
        },
        select: {
            id: true,
        }
    })

    return card
}