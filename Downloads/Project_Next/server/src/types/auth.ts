import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface DecodedToken {
    userId: string;
    // Add other properties as needed
}

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'Không tìm thấy token' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as DecodedToken;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token không hợp lệ' });
    }
};



