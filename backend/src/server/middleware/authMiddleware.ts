import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Conta from './../services/conta/contaModels';

export interface AuthenticatedRequest extends Request {
    user: Conta;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Token de autenticação não fornecido' });
        }

        const decoded = jwt.verify(token, 'secret') as JwtPayload;

        const conta = await Conta.findByPk(decoded.id);

        if (!conta) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        req.user = conta;
        next();
    } catch (error: any) {
        console.error('Erro no middleware de autenticação:', error.message);
        return res.status(401).json({ error: 'Falha na autenticação', details: error.message });
    }
};
