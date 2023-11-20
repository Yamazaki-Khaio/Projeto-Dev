import { Request, Response } from 'express';
import Endereco from './enderecoModels';

export function getEnderecos(req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const enderecos = await Endereco.findAll();
            res.status(200).json(enderecos);
            resolve();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar endereços.' });
            reject(error);
        }
    });
}

export function getEnderecoById(req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const { id } = req.params;
        try {
            const endereco = await Endereco.findByPk(id);
            if (!endereco) {
                res.status(404).json({ message: 'Endereço não encontrado.' });
                resolve();
                return;
            }
            res.status(200).json(endereco);
            resolve();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar endereço.' });
            reject(error);
        }
    });
}

export function createEndereco(req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            is_principal,
            id_pessoa,
        } = req.body;
        try {
            const endereco = await Endereco.create({
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                is_principal,
                id_pessoa,
            });
            res.status(201).json(endereco);
            resolve();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar endereço.' });
            reject(error);
        }
    });
}

export function updateEndereco(req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const { id } = req.params;
        const {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            is_principal,
            id_pessoa,
        } = req.body;
        try {
            const endereco = await Endereco.findByPk(id);
            if (!endereco) {
                res.status(404).json({ message: 'Endereço não encontrado.' });
                resolve();
                return;
            }
            endereco.cep = cep;
            endereco.logradouro = logradouro;
            endereco.numero = numero;
            endereco.complemento = complemento;
            endereco.bairro = bairro;
            endereco.cidade = cidade;
            endereco.estado = estado;
            endereco.is_principal = is_principal;
            endereco.id_pessoa = id_pessoa;
            await endereco.save();
            res.status(200).json(endereco);
            resolve();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar endereço.' });
            reject(error);
        }
    });
}

export function deleteEndereco(req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const { id } = req.params;
        try {
            const endereco = await Endereco.findByPk(id);
            if (!endereco) {
                res.status(404).json({ message: 'Endereço não encontrado.' });
                resolve();
                return;
            }
            await endereco.destroy();
            res.status(204).send();
            resolve();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar endereço.' });
            reject(error);
        }
    });
}

const enderecoControllers = {
    getEnderecos,
    getEnderecoById,
    createEndereco,
    updateEndereco,
    deleteEndereco,
};

export default enderecoControllers;
