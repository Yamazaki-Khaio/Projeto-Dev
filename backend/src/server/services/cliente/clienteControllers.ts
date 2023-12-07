import { Request, Response } from 'express';
import Cliente from './clienteModels';
import Pessoa from '../pessoa/pessoaModels';
import Representante from '../representante/representanteModels';








// Defina o controlador para o modelo 'Cliente'
class ClienteController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            // Verifica se a Pessoa já existe pelo identificador (identificacao)
            const identificacao = req.body.identificacao.replace(/\D/g, '');
            // Remove todos os caracteres não numéricos
            // Exemplo: '123.456.789-01' -> '12345678901);
            // Se o tamanho da identificação for diferente de 11 ou 14, retorna erro 400
            if (identificacao.length !== 11 && identificacao.length !== 14) {
                return res.status(400).json({ error: 'Identificação inválida' });
            }
            let pessoa = await Pessoa.findOne({ where: { identificacao: identificacao } });
            // Se a Pessoa não existe, cria uma nova
            if (!pessoa) {
                const { nome, nome_ref, incricao_municipal, incricao_estadual } = req.body;

                switch (identificacao.length) {
                    case 11:
                        pessoa = await Pessoa.create({ nome: nome, identificacao: identificacao, nome_mae: nome_ref });
                        break;
                    case 14:
                        pessoa = await Pessoa.create({ nome, identificacao: identificacao, nome_fantasia: nome_ref, inscricao_municipal: incricao_municipal, inscricao_estadual: incricao_estadual });
                        break;
                    default:
                        return res.status(400).json({ error: 'Identificação inválida' });
                }
            }   

            const cliente = await Cliente.create({ id_pessoa: pessoa!.id });
            return res.status(200).json(cliente);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        try {
            const cliente = await Cliente.findByPk(id);

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            // Verifica se a Pessoa já existe pelo identificador (identificacao)
            const identificacao = req.body.identificacao.replace(/\D/g, '');
            let pessoa = await Pessoa.findOne({ where: { identificacao } });
            // Se a Pessoa não existe, retorna erro 404
            if (!pessoa) {
                return res.status(404).json({ error: 'Cliente não existe' });
            } else {
                // Se a Pessoa existe, verifica se o ID da Pessoa é diferente do ID do Cliente
                if (pessoa.id !== cliente.id_pessoa) {
                    return res.status(400).json({ error: 'A identificação informada já está sendo utilizada por outro Cliente' });
                } else {
                    // Se a Pessoa existe e o ID da Pessoa é igual ao ID do Cliente, atualiza a Pessoa
                    const { nome, nome_ref, incricao_municipal, incricao_estadual } = req.body;

                    switch (identificacao.length) {
                        case 11:
                            await Pessoa.update({ nome: nome, identificacao: identificacao, nome_mae: nome_ref }, { where: { id: pessoa.id } });
                            break;
                        case 14:
                            await Pessoa.update({ nome, identificacao: identificacao, nome_fantasia: nome_ref, inscricao_municipal: incricao_municipal, inscricao_estadual: incricao_estadual }, { where: { id: pessoa.id } });
                            break;
                        default:
                            return res.status(400).json({ error: 'Identificação inválida' });
                    }
                }

            }
            // Atualiza o Cliente
            await Cliente.update(req.body, { where: { id } });

            return res.status(204).json(cliente);
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const clientes = await Cliente.findAll();
            const clientesPessoa = await Pessoa.findAll();
            clientes.forEach(cliente => {
                clientesPessoa.forEach(pessoa => {
                    if (cliente.id_pessoa == pessoa.id) {
                        cliente.dataValues.identificacao = pessoa.identificacao;
                        cliente.dataValues.nome = pessoa.nome;
                        cliente.dataValues.nomeFantasia = pessoa.nome_fantasia;
                        cliente.dataValues.nomeMae = pessoa.nome_mae;
                        cliente.dataValues.incricaoMunicipal = pessoa.inscricao_municipal;
                        cliente.dataValues.incricaoEstadual = pessoa.inscricao_estadual;
                    }
                });
            });
            return res.status(200).json(clientes);
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

            const pessoa = await Pessoa.findByPk(cliente.id_pessoa);

            if (!pessoa) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }

            const clienteData = {
                id: cliente.id,
                identificacao: pessoa.identificacao,
                nome: pessoa.nome,
                nome_fantasia: pessoa.nome_fantasia,
                nome_mae: pessoa.nome_mae,
                incricao_municipal: !pessoa.inscricao_municipal,
                incricao_estadual: !pessoa.inscricao_estadual,
                situacao: cliente.situacao,
                data_cadastro: cliente.data_cadastro.toLocaleDateString('pt-BR'),
            };

            return res.status(200).json(clienteData);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {

            // Verifica se o Cliente existe
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            // Verifica se há um Representante associado ao Cliente
            const representante = await Representante.findOne({ where: { id_cliente: id } });
            if (representante) {
                return res.status(400).json({ error: 'Não é possível remover o Cliente com um Representante associado' });
            }

            // Remove o Cliente
            await Cliente.destroy({ where: { id } });

            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new ClienteController();

