import { verify } from 'jsonwebtoken';

export const withAuth = (handler) => {
    return (req, res) => {
        const { authorization } = req.headers;
        if(!authorization) return res.status(401).json({ error: "The authorization header is required" });
        const token = authorization.split(' ')[1];
        
        verify(token, process.env.SECRET_KEY!, (err, payload) => {
            if(err) return res.status(401).json({ error: "Unauthorized" });
            req.auth = { user: payload };
            handler(req, res);
        });
    }
}