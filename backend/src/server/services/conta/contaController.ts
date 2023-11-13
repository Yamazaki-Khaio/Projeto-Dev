import { Request, Response } from "express";
import Conta from "./contaModels";
import jwt from 'jsonwebtoken';

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
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      // Buscar o usuário no banco de dados com base no email
      const conta = await Conta.findOne({ where: { email } });

      if (!conta) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados (sem criptografia)
      if (senha !== conta.senha) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gerar um token JWT
      const token = jwt.sign({ id: conta.id }, 'secret', {
        expiresIn: '1h', // Define um tempo de expiração do token (por exemplo, 1 hora)
      });

      // Retornar o token para o cliente
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};


export default ContaController;