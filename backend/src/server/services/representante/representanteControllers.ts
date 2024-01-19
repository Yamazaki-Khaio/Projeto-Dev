import { Request, Response } from 'express';
import Representante from './representanteModels';
import Pessoa from '../pessoa/pessoaModels';  // Importe o modelo Pessoa

class RepresentanteController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
        const { identificador, nome } = req.body;
        // Create a new Pessoa for the Representante
        const pessoa = await Pessoa.create({ identificacao: identificador, nome: nome, nome_fantasia: nome, nome_mae: nome, inscricao_municipal: '0', inscricao_estadual: '0' });

        // Create a new Representante with the Pessoa and Cliente IDs
        const representante = await Representante.create({
            identificador,
            nome,
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
}

export default new RepresentanteController();
