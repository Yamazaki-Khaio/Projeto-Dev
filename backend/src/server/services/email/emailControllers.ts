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

  public async getAllByPessoa(req: Request, res: Response): Promise<Response> {
    const { id_pessoa } = req.params;

    try {
      const pessoa = await Pessoa.findByPk(id_pessoa);

      if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }

      const emails = await Email.findAll({ where: { id_pessoa } });

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
      const { id_pessoa } = req.params;
      const { email, is_principal} = req.body;
      const pessoa = await Pessoa.findOne({ where: { id: id_pessoa } });
      const emailExists = await Email.findOne({ where: { email: email.toLowerCase(), id_pessoa: id_pessoa } });

      if (emailExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado para esta pessoa' });
      }
      else if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }
      else if (is_principal) {
        const principalEmail = await Email.findOne({ where: { id_pessoa: id_pessoa, is_principal: true } });
        if (principalEmail) {
          principalEmail.is_principal = false;
          await principalEmail.save();
        }
      }


      const novoEmail = await Email.create({ email: email.toLowerCase(), is_principal, id_pessoa });

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

      const emailExists = await Email.findOne({ where: { email: email.toLowerCase(), id_pessoa: emailInstance.id_pessoa } });

      if (emailExists && emailExists.id !== emailInstance.id) {
        return res.status(400).json({ error: 'E-mail já cadastrado para esta pessoa' });
      }

      if (is_principal && !emailInstance.is_principal) {
        await Email.update({ is_principal: false }, { where: { id_pessoa: emailInstance.id_pessoa } });
      }

      await emailInstance.update({ email: email.toLowerCase(), is_principal });

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
