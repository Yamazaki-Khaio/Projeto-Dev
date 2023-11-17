import { Request, Response } from 'express';
import Pessoa from './pessoaModels';

class PessoaController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const pessoa = await Pessoa.create(req.body);
      return res.status(201).json(pessoa);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const pessoas = await Pessoa.findAll();
      return res.status(200).json(pessoas);
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const pessoa = await Pessoa.findByPk(id);

      if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }

      return res.status(200).json(pessoa);
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const [updatedRows] = await Pessoa.update(req.body, { where: { id } });

      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }

      const pessoa = await Pessoa.findByPk(id);

      return res.status(200).json(pessoa);
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const deletedRows = await Pessoa.destroy({ where: { id } });

      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }

      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new PessoaController();
