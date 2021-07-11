import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_PASS } from '../config/settings';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = String(req.headers.authorization);
        const _user = jwt.verify(token, JWT_PASS);
        if (!_user) {
            throw new Error('No se pudo obtener autorización');
        }
        res.locals._user = _user;
        next();
    } catch(err) {
        res.status(403).send({ done: false, message: 'No está autorizado para esta acción' });
    }
}