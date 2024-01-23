import Telefone from "./telefoneModels";
import { Response, Request } from "express";


class TelefoneController {
    //create
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { id_pessoa } = req.params;

            const { tel, is_principal } = req.body;
            // Verificar se já existe um telefone principal
            if (is_principal) {
                const principalTelefone = await Telefone.findOne({ where: { id_pessoa, is_principal: true } });
                if (principalTelefone) {
                    principalTelefone.is_principal = false;
                    await principalTelefone.save();
                }
            }
            const telefone = await Telefone.create({ tel, is_principal, id_pessoa});
            console.error(telefone);
            return res.status(201).json(telefone);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error });
        }
    }

    //update
    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const telefone = await Telefone.findByPk(id);

            if (!telefone) {
                return res.status(404).json({ error: 'Telefone não encontrado' });
            }

            const { is_principal } = req.body;

            // Verificar se o telefone sendo editado é o principal
            if (is_principal) {
                const principalTelefone = await Telefone.findOne({ where: { id_pessoa: telefone.id_pessoa, is_principal: true } });
                if (principalTelefone && principalTelefone.id !== telefone.id) {
                    principalTelefone.is_principal = false;
                    await principalTelefone.save();
                }
            }

            await telefone.update(req.body);

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

            // Verificar se o telefone sendo excluído é o principal
            if (telefone.is_principal) {
                const otherTelefone = await Telefone.findOne({
                    where: {
                        id_pessoa: telefone.id_pessoa,
                        is_principal: false
                    },
                    order: [['createdAt', 'ASC']] // Ordena por ordem de criação (o mais antigo primeiro)
                });

                if (otherTelefone) {
                    otherTelefone.is_principal = true;
                    await otherTelefone.save();
                }
            }

            await telefone.destroy();
            return res.status(200).json({ message: 'Telefone excluído com sucesso.' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o telefone.' });
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

    async getTelefoneAllByIdPessoa(req: Request, res: Response): Promise<Response> {
        const { id_pessoa } = req.params;
        try {
            const telefone = await Telefone.findAll({ where: { id_pessoa: id_pessoa} });

            if (!telefone) {
                return res.status(404).json({ error: 'Telefone não encontrado' });
            }

            return res.status(200).json(telefone);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getTelefoneById(req: Request, res: Response): Promise<Response> {
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




}

export default new TelefoneController();
