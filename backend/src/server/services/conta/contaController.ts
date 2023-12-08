import { Request, Response } from "express";
import Conta from "./contaModels";
import jwt from 'jsonwebtoken';
import { verificarCamposObrigatorios, verificarEmailExistente, hashSenha } from "../../middleware/contaMiddleware";
import * as bcrypt from 'bcrypt';

export const ContaController = {
  create: [verificarCamposObrigatorios, verificarEmailExistente, hashSenha, async (req: Request, res: Response) => {
    try {
      const { email, nome, senha } = req.body;

      const novaConta = await Conta.create({ email: email.toLowerCase(), nome, senha });
      return res.status(201).json(novaConta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  }],

  login: async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
      const conta = await Conta.findOne({ where: { email: email.toLowerCase() } });

      if (!conta || !(await bcrypt.compare(senha, conta.senha))) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos. Tente novamente' });
      }

      const token = jwt.sign({ id: conta.id }, 'secret', {
        expiresIn: '1h',
        
      });

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};

export default ContaController;
