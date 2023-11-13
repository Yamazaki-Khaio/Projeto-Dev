import { Request, Response } from "express";
import Conta from "./contaModels";

export const ContaController = {
    async create(req: Request, res: Response) {
        try {
            const { email, nome, senha } = req.body;
            const contaExistente = await Conta.findOne({ where: { email } });

            return contaExistente
                ? res.status(400).json({ message: 'Conta já existente' })
                : (!email || !nome || !senha)
                ? res.status(400).json({ message: 'Dados obrigatórios faltando' })
                : res.status(201).json(await Conta.create(req.body));
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};



