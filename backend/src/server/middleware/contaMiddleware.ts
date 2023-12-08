import { Request, Response, NextFunction } from "express";
import Conta from "../services/conta/contaModels";
import bcrypt from 'bcrypt';

export const verificarCamposObrigatorios = (req: Request, res: Response, next: NextFunction) => {
  const { email, nome, senha } = req.body;

  if (!email || !nome || !senha) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  next();
};

export const verificarEmailExistente = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const contaExistente = await Conta.findOne({ where: { email } });

  if (contaExistente) {
    return res.status(400).json({ message: 'E-mail já está em uso' });
  }

  next();
};

export const hashSenha = async (req: Request, res: Response, next: NextFunction) => {
  const { senha } = req.body;

  const hashedSenha = await bcrypt.hash(senha, 10);

  req.body.senha = hashedSenha;

  next();
};
