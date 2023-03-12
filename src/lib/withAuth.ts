import { JwtPayload, verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Request extends NextApiRequest {
    auth: {
        user: JwtPayload
    }
}

export const withAuth = (handler: { (req: Request, res: NextApiResponse<any>): Promise<void>; (arg0: any, arg1: any): void; }) => {
    return (req: Request, res: NextApiResponse) => {
        const { authorization } = req.headers;
        if(!authorization) return res.status(401).json({ error: "The authorization header is required" });
        const token = authorization.split(' ')[1];
        
        verify(token, process.env.SECRET_KEY!, (err, payload) => {
            if(err) return res.status(401).json({ error: "Unauthorized" });
            req.auth = { user: payload as JwtPayload};
            handler(req, res);
        });
    }
}