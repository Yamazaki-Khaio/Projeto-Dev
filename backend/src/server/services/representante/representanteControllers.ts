import { Request, Response } from 'express';
import Representante from './representanteModels';
import Pessoa from '../pessoa/pessoaModels';  // Importe o modelo Pessoa
import { AuthenticatedRequest } from '../../middleware/authMiddleware';
import Cliente from '../cliente/clienteModels';


class RepresentanteController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
        const { identificador, nome } = req.body;

        // Check if required fields are provided
        if (!identificador || !nome) {
          return res.status(400).json({ error: 'Identificador e nome são campos obrigatórios.' });
        }

        // Check if the Cliente exists
        const cliente = await Cliente.findByPk(req.params.id_cliente);
        let pessoaID = await Pessoa.findOne({ where: { identificacao: identificador } });

        if (!cliente) {
          return res.status(404).json({ error: 'Cliente não encontrado.' });
        }

        // Check if the Pessoa already exists
        if (pessoaID) {
          return res.status(400).json({ error: 'Já existe uma pessoa com este identificador.' });
        }
        // Create a new Pessoa for the Representante
        const pessoa = await Pessoa.create({ identificacao: identificador, nome: nome, conta_id: (req as AuthenticatedRequest).user.id, nome_mae: 'none', nome_fantasia:'none', });

        // Create a new Representante with the Pessoa and Cliente IDs
        const representante = await Representante.create({
            id_pessoa: pessoa.id,
            id_cliente: req.params.id_cliente,
        });

        return res.status(201).json(representante);
    } catch (error) {
        console.error('Erro ao criar o representante:', error);
        return res.status(500).json({ error: 'Erro ao criar o representante.' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const representante = await Representante.findByPk(id);

      if (!representante) {
        return res.status(404).json({ error: 'Representante não encontrado.' });
      }

      await representante.destroy();
      return res.status(200).json({ message: 'Representante excluído com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir o representante:', error);
      return res.status(500).json({ error: 'Erro ao excluir o representante.' });
    }
  }
  
  public async getRepresentantesPorCliente(req: Request, res: Response): Promise<Response> {
    const { id_cliente } = req.params;
    try {
      const representantes = await Representante.findAll({ where: { id_cliente: id_cliente } });

      if (representantes.length === 0) {
        return res.status(404).json({ error: 'Representante não encontrado' });
      }

      const representanteData = await Promise.all(representantes.map(async (representante) => {
        const pessoa = await Pessoa.findByPk(representante.id_pessoa);

        if (!pessoa) {
          return null;
        }

        return {
          id: representante.id,
          identificador: pessoa.identificacao,
          nome: pessoa.nome,
        };
      }));

      const filteredRepresentantes = representanteData.filter((representante) => representante !== null);

      return res.status(200).json(filteredRepresentantes);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getRepresentante(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const representante = await Representante.findByPk(id);

      if (!representante) {
        return res.status(404).json({ error: 'Representante não encontrado' });
      }

      const pessoa = await Pessoa.findByPk(representante.id_pessoa);

      if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }

      return res.status(200).json({
        id: representante.id,
        identificador: pessoa.identificacao,
        nome: pessoa.nome,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }


  public async updateRepresentante(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { identificador, nome } = req.body;
      const representante = await Representante.findByPk(id);

      if (!representante) {
        return res.status(404).json({ error: 'Representante não encontrado.' });
      }

      const pessoa = await Pessoa.findByPk(representante.id_pessoa);

      if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada.' });
      }

      pessoa.identificacao = identificador;
      pessoa.nome = nome;
      await pessoa.save();

      return res.status(200).json({
        id: representante.id,
        identificador: pessoa.identificacao,
        nome: pessoa.nome,
      });
    } catch (error) {
      console.error('Erro ao atualizar o representante:', error);
      return res.status(500).json({ error: 'Erro ao atualizar o representante.' });
    }
  }

  //get all representantes 

}

export default new RepresentanteController();
