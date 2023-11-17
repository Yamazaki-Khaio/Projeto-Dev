import { Request, Response } from 'express';
import Cliente from './clienteModels';
import Pessoa from '../pessoa/pessoaModels';



// Defina o controlador para o modelo 'Cliente'
class ClienteController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            // Verifica se a Pessoa já existe pelo identificador (identificacao)
            const identificacao = req.body.identificacao;
            let pessoa = await Pessoa.findOne({ where: { identificacao } });
            // Se a Pessoa não existe, cria uma nova
            if (!pessoa) {
                pessoa = await Pessoa.create(req.body);
            }
            // Agora, cria o Cliente associado à Pessoa
            const cliente = await Cliente.create({ id_pessoa: pessoa.id });

            return res.status(201).json(cliente);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const clientes = await Cliente.findAll({ include: Pessoa });
            return res.status(200).json(clientes.map((cliente) => {
                const { id, Pessoa: { nome, identificacao } } = cliente.toJSON();
                return { id, nome, identificacao };
            }));
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const cliente = await Cliente.findByPk(id);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            return res.status(200).json(cliente);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const [updatedRows] = await Cliente.update(req.body, { where: { id } });

            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            const cliente = await Cliente.findByPk(id);

            return res.status(200).json(cliente);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const deletedRows = await Cliente.destroy({ where: { id } });

            if (deletedRows === 0) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new ClienteController();
