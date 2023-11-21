
import { Request, Response } from 'express';
import Representante from './representanteModels';

class RepresentanteController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            /**  const { id, nome, clienteId } = req.body;
            const { id } = req.params;
            const cliente = await ClienteController.getById(clienteId);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }
             */
            const { id, nome, clienteId } = req.body;
            const representante = await Representante.create({ id, nome, clienteId });
            return res.status(201).json(representante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o representante.' });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const representante = await Representante.findOne({ where: { id } });
            if (!representante) {
                return res.status(404).json({ error: 'Representante não encontrado.' });
            }

            await representante.destroy();
            return res.status(200).json({ message: 'Representante excluído com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o representante.' });
        }
    }
}

export default new RepresentanteController();
