import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Conta from './../services/conta/contaModels';

interface AuthenticatedRequest extends Request {
    user: Conta;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Token de autenticação não fornecido' });
        }

        // Adicionando mensagem de depuração
        console.log('Token recebido:', token);

        const decoded = jwt.verify(token, 'secret') as JwtPayload;

        const conta = await Conta.findByPk(decoded.id);

        if (!conta) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        req.user = conta;
        next();
    } catch (error: any) {
        // Adicionando mensagem de depuração
        console.error('Erro no middleware de autenticação:', error.message);
        return res.status(401).json({ message: 'Falha na autenticação', error: error.message });
    }
};
