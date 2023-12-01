import { Request, Response } from 'express';
import Pessoa from '../pessoa/pessoaModels';
import Email from './emailModels';

class EmailController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const emails = await Email.findAll();

      return res.status(200).json(emails);
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const email = await Email.findByPk(id);

      if (!email) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }

      return res.status(200).json(email);
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }


  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, is_principal, id_pessoa } = req.body;
      const pessoa = await Pessoa.findOne({ where: { id: id_pessoa } });

      if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }

      const emailExists = await Email.findOne({ where: { email, id_pessoa } });

      if (emailExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado para esta pessoa' });
      }

      if (is_principal) {
        await Email.update({ is_principal: false }, { where: { id_pessoa } });
      }

      const novoEmail = await Email.create({ email, is_principal, id_pessoa });

      return res.status(201).json(novoEmail);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const { email, is_principal } = req.body;
      const emailInstance = await Email.findByPk(id);

      if (!emailInstance) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }

      const emailExists = await Email.findOne({ where: { email, id_pessoa: emailInstance.id_pessoa } });

      if (emailExists && emailExists.id !== emailInstance.id) {
        return res.status(400).json({ error: 'E-mail já cadastrado para esta pessoa' });
      }

      if (is_principal && !emailInstance.is_principal) {
        await Email.update({ is_principal: false }, { where: { id_pessoa: emailInstance.id_pessoa } });
      }

      await emailInstance.update({ email, is_principal });

      return res.status(200).json(emailInstance);
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const emailInstance = await Email.findByPk(id);

      if (!emailInstance) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }

      if (emailInstance.is_principal) {
        const otherEmail = await Email.findOne({ where: { id_pessoa: emailInstance.id_pessoa }, order: [['id', 'ASC']] });

        if (otherEmail) {
          await otherEmail.update({ is_principal: true });
        }
      }

      await emailInstance.destroy();

      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new EmailController();
