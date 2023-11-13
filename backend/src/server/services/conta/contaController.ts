import { Request, Response } from "express";
import Conta from "./contaModels";

export const ContaController = {
  async create(req: Request, res: Response) {
    try {
      const { email, nome, senha } = req.body;

      // Verifica se os campos obrigatórios estão presentes
      if (!email || !nome || !senha) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando' });
      }

      // Verifique se o e-mail já está em uso
      const contaExistente = await Conta.findOne({ where: { email } });

      if (contaExistente) {
        return res.status(400).json({ message: 'E-mail já está em uso' });
      }

      // Crie a conta se tudo estiver correto
      const novaConta = await Conta.create({ email, nome, senha });
      return res.status(201).json(novaConta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  },
};

export default ContaController;