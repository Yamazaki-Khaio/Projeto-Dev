import e, { Request, Response } from 'express';
import Endereco from './enderecoModels';
import Pessoa from '../pessoa/pessoaModels';

export async function getEnderecos(req: Request, res: Response): Promise<void> {
    try {
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar endereços.' });
    }
}

export async function getEnderecoAllByPessoa(req: Request, res: Response): Promise<void> {
    const { id_pessoa } = req.params;
    try {
        const enderecos = await Endereco.findAll({ where: { id_pessoa } });
        res.status(200).json(enderecos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar endereços.' });
    }
}

export async function createEndereco(req: Request, res: Response): Promise<void> {
    try {
        const { id_pessoa } = req.params;
        const {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            is_principal,
        } = req.body;

        if (!id_pessoa || !cep || !logradouro || !numero || !bairro || !cidade || !estado) {
            res.status(400).json({ message: 'Dados obrigatórios não informados.' });
            return;
        }

        // Verifica se a pessoa existe no banco
        const pessoa = await Pessoa.findByPk(id_pessoa);
        if (!pessoa) {
            res.status(404).json({ message: 'Pessoa não encontrada.' });
            return;
        }

        // Verifica se já existe um endereço principal para esta pessoa
        if (is_principal) {
            const enderecoPrincipal = await Endereco.findOne({ where: { id_pessoa: id_pessoa, is_principal: true } });
            if (enderecoPrincipal) {
                enderecoPrincipal.is_principal = false;
                await enderecoPrincipal.save();
                return;
            }

        }
        const countEnderecos = await Endereco.count({ where: { id_pessoa } });
        const novoEndereco = await Endereco.create({
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            is_principal: countEnderecos === 0 ? true : is_principal,
            id_pessoa,
        });

        res.status(201).json(novoEndereco);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar endereço.' });
    }
}

export async function getEndereco(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
        const endereco = await Endereco.findByPk(id);
        if (!endereco) {
            res.status(404).json({ message: 'Endereço não encontrado.' });
            return;
        }
        res.status(200).json(endereco);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar endereço.' });
    }
}


export async function updateEndereco(req: Request, res: Response): Promise<void> {
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
    } = req.body;
    const id_pessoa = req.body.id_pessoa;

    if (!id_pessoa || !cep || !logradouro || !numero || !bairro || !cidade || !estado || (is_principal === undefined)) {
        res.status(400).json({ message: 'Dados obrigatórios não informados.' });
        return;
    }

    try {
        const endereco = await Endereco.findByPk(id);
        if (!endereco) {
            res.status(404).json({ message: 'Endereço não encontrado.' });
            return;
        }

        // Se está marcando como "Principal", remove o indicador do outro endereço "Principal"
        if (is_principal) {
            const enderecoPrincipalAntigo = await Endereco.findOne({ where: { id_pessoa, is_principal: true } });
            if (enderecoPrincipalAntigo && enderecoPrincipalAntigo.id !== endereco.id) {
                enderecoPrincipalAntigo.is_principal = false;
                await enderecoPrincipalAntigo.save();
            }
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar endereço.' });
    }
}

export async function deleteEndereco(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
        const endereco = await Endereco.findByPk(id);
        if (!endereco) {
            res.status(404).json({ message: 'Endereço não encontrado.' });
            return;
        }

        const id_pessoa = endereco.id_pessoa;

        // Verifica se o endereço que está sendo excluído é o principal
        if (endereco.is_principal) {
            // Encontra o endereço mais antigo da mesma pessoa
            const enderecoAntigo = await Endereco.findOne({
                where: {
                    id_pessoa,
                    is_principal: false,
                },
                order: [['createdAt', 'ASC']], // Ordena por ordem de criação (o mais antigo primeiro)
            });

            // Se encontrou um endereço mais antigo, atualiza para ser o principal
            if (enderecoAntigo) {
                enderecoAntigo.is_principal = true;
                await enderecoAntigo.save();
            }
        }

        await endereco.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar endereço.' });
    }
}

const enderecoControllers = {
    getEnderecos,
    getEnderecoAllByPessoa,
    getEndereco,
    createEndereco,
    updateEndereco,
    deleteEndereco,
};

export default enderecoControllers;
