import { Request, Response } from "express";
import Conta from "./contaModels";
import jwt from 'jsonwebtoken';
import { verificarCamposObrigatorios, verificarEmailExistente, hashSenha } from "../../middleware/contaMiddleware";
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';
import { authMiddleware } from "../../middleware/authMiddleware";

class ContaController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, nome, senha } = req.body;

      if (!email || !nome || !senha) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      const hashedSenha = await bcrypt.hash(senha, 10);

      const novaConta = await Conta.create({ email: email.toLowerCase(), nome, senha: hashedSenha });
      res.status(201).json(novaConta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha, rememberMe } = req.body;


    try {
      const conta = await Conta.findOne({ where: { email: email.toLowerCase() } });

      if (!conta) {
        return res.status(401).json({ message: 'E-mail inserido incorreto. Tente novamente' });
      }

      const senhaCorreta = await bcrypt.compare(senha, conta.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ message: 'Senha inserida incorreta. Tente novamente' });
      }

      // Define a expiração do token com base na opção "rememberMe"
      const expiresIn = rememberMe ? '62d' : '1h';

      const token = jwt.sign({ id: conta.id }, 'secret', {
        expiresIn,
      });

      

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const user = (req as AuthenticatedRequest).user;

      if (!user) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const { nome, email, senha, senha_atual } = req.body;

      // Verifica se a senha atual é válida
      const conta = await Conta.findByPk(user.id);

      if (!conta) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const senhaCorreta = await bcrypt.compare(senha_atual, conta.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ message: 'Senha atual incorreta.' });
      }

      // Verifica se o e-mail já está em uso por outro usuário
      const emailExistente = await Conta.findOne({
        where: {
          email: email.toLowerCase(),
          id: { [Op.not]: user.id },
        },
      });

      if (emailExistente) {
        return res.status(400).json({ message: 'E-mail já está em uso por outro usuário.' });
      }

      // Atualiza os dados do perfil
      const updatedProfile = await Conta.update(
        { nome, email: email.toLowerCase(), senha: await bcrypt.hash(senha, 10) },
        { where: { id: user.id } }
      );

      if (!updatedProfile[0]) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json({ message: 'Perfil atualizado com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const user = (req as AuthenticatedRequest).user;

      if (!user) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const deletedAccount = await Conta.destroy({ where: { id: user.id } });

      if (!deletedAccount) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json({ message: 'Conta excluída com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      const user = (req as AuthenticatedRequest).user;


      if (!user) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }

      const conta = await Conta.findByPk(user.id);

      if (!conta) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json(conta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new ContaController() ;
