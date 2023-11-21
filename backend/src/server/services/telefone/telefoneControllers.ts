import Telefone from "./telefoneModels";
import { Response, Request } from "express";


class TelefoneController {
    //create
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { id, numero, is_principal, id_pessoa } = req.body;
            const telefone = await Telefone.create({ id, numero, is_principal, id_pessoa });
            return res.status(201).json(telefone);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o telefone.' });
        }
    }

    //read
    async getAll(req: Request, res: Response): Promise<Response> {

        try {
            const telefones = await Telefone.findAll();
            return res.status(200).json(telefones);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

    }

    async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const telefone = await Telefone.findByPk(id);

            if (!telefone) {
                return res.status(404).json({ error: 'Telefone não encontrado' });
            }

            return res.status(200).json(telefone);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    //update
    async update(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        try {
            const [updatedRows] = await Telefone.update(req.body, { where: { id } });

            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Telefone não encontrado' });
            }

            const telefone = await Telefone.findByPk(id);

            return res.status(200).json(telefone);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    //delete
    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const telefone = await Telefone.findOne({ where: { id } });
            if (!telefone) {
                return res.status(404).json({ error: 'Telefone não encontrado.' });
            }

            await telefone.destroy();
            return res.status(200).json({ message: 'Telefone excluído com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o telefone.' });
        }
    }
}

export default new TelefoneController();
