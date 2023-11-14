import { Request, Response } from 'express';
import Cliente from './clienteModels';
import sequelize from '../../config/sequelize';

//cliente tem que ter nome, indeficao. 
//caso identificação === cpnj o nome fantasia é obritatorio, 
//caso identificação === cpf o nome da mãe é obrigatorio
//cnpj/cpf unicos por cliente
//indetificação não pode ser editado
//é possivel edição de cliente
//ident = cnpj deve-se permitir informar a inscrição estadual
//ident = cnpj deve-se permitir informar a inscrição municipal

//criar cliente
export async function createClient(req: Request, res: Response) {
    const { name, identify, mail, tel, end, city, state, cep, nomeFantasia, nomeMae, inscricaoEstadual, inscricaoMunicipal } = req.body;
    
    //verificar se o cliente já existe
    if (await Cliente.findOne({ where: { identify } })) {
        return res.status(400).json({ error: 'Cliente já existe' });
    }

    switch (identify) {
        case 'cpf':
            if (!name || !nomeMae) {
                return res.status(400).json({ error: 'Nome e nome da mãe são obrigatórios' });
            }
            break;
        case 'cnpj':
            if (!name || !nomeFantasia) {
                return res.status(400).json({ error: 'Nome e nome fantasia são obrigatórios' });
            }
            break;
        default:
            return res.status(400).json({ error: 'Identificação inválida' });
    }

    const cliente = await Cliente.create({
        name,
        identify,
        mail,
        tel,
        end,
        city,
        state,
        cep,
        nomeFantasia,
        nomeMae,
        inscricaoEstadual: identify === 'cnpj' ? inscricaoEstadual : null,
        inscricaoMunicipal: identify === 'cnpj' ? inscricaoMunicipal : null
    });

    res.json(cliente);
}

// Função para listar todos os clientes
export async function getAllClientes(req: Request, res: Response) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
}

// Função para listar um cliente por ID
export async function getClienteById(req: Request, res: Response) {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
}

// Função para atualizar um cliente por ID
export async function updateClient(req: Request, res: Response) {
    const { id } = req.params;
    const { name, mail, tel, end, city, state, cep, nomeFantasia, nomeMae, inscricaoEstadual, inscricaoMunicipal } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (cliente.identify !== req.body.identify) {
        return res.status(400).json({ error: 'A identificação não pode ser alterada' });
    }

    if (await Cliente.findOne({ where: { identify: req.body.identify, id: { [sequelize.Op.not]: id } } })) {
        return res.status(400).json({ error: 'Já existe um cliente com essa identificação' });
    }

    cliente.name = name;
    cliente.mail = mail;
    cliente.tel = tel;
    cliente.end = end;
    cliente.city = city;
    cliente.state = state;
    cliente.cep = cep;
    cliente.nomeFantasia = nomeFantasia;
    cliente.nomeMae = nomeMae;
    cliente.inscricaoEstadual = cliente.identify === 'cnpj' ? inscricaoEstadual : null;
    cliente.inscricaoMunicipal = cliente.identify === 'cnpj' ? inscricaoMunicipal : null;

    await cliente.save();

    res.json(cliente);
}

// Função para deletar um cliente por ID
export async function deleteClient(req: Request, res: Response) {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    await cliente.destroy();
    res.json({ message: 'Cliente deletado com sucesso' });
}

export default clienteControllers = {
    createClient,
    getAllClientes,
    getClienteById,
    updateClient,
    deleteClient
};

