import { Request, Response } from 'express';
import Cliente from './clienteModels';
import Pessoa from '../pessoa/pessoaModels';


//cliente tem que ter nome, indeficao. 
//caso identificação === cpnj o nome fantasia é obritatorio, 
//caso identificação === cpf o nome da mãe é obrigatorio
//cnpj/cpf unicos por cliente
//indetificação não pode ser editado
//é possivel edição de cliente
//ident = cnpj deve-se permitir informar a inscrição estadual
//ident = cnpj deve-se permitir informar a inscrição municipal


const clienteControllers = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
};



// Verificar se o cliente já existe
async function verifyClientExists(identificacao: string, res: Response) {
    if (await Pessoa.findOne({ where: { identificacao }})) {
        return res.status(400).json({ error: 'Cliente já existe' });
    }
}

// Verificar se a identificação é válidas
function validateIdentification(identificacao: string, res: Response) {
    const cpf: boolean = identificacao.length === 11;
    const cnpj: boolean = identificacao.length === 14;

    if (!cpf && !cnpj) {
        return res.status(400).json({ error: 'Identificação inválida' });
    }
}

// Verificar se os campos obrigatórios foram informados
function checkRequiredFields(fields: Record<string, any>, requiredFields: string[], res: Response) {
    const missingFields = requiredFields.filter(key => !fields[key]);
    if (missingFields.length > 0) {
        return res.status(400).json({ error: 'Campo obrigatório não informado' });
    }
}



//criar cliente
export async function createClient(req: Request, res: Response) {
    const { name, identificacao, nomeFantasia, nomeMae, inscricaoEstadual, inscricaoMunicipal } = req.body;

    // Verificar se o cliente já existe
    await verifyClientExists(identificacao, res);

    // Verificar se a identificação é válida
    validateIdentification(identificacao, res);

    // Verificar campos obrigatórios
    const requiredFields = ['name', 'identificacao'];
    if (identificacao.length === 11) {
        requiredFields.push('nomeMae');
    } else if (identificacao.length === 14) {
        requiredFields.push('nomeFantasia');
    }
    checkRequiredFields(req.body, requiredFields, res);

     // Buscar ou criar a pessoa associada ao cliente
     let pessoa = await Pessoa.findOne({ where: { identificacao } });

     if (!pessoa) {
         const pessoaPayload = {
             nome: name,
             identificacao,
             nomeFantasia: identificacao.length === 14 ? nomeFantasia : null,
             nomeMae: identificacao.length === 11 ? nomeMae : null,
             inscricaoEstadual: identificacao.length === 14 ? inscricaoEstadual : null,
             inscricaoMunicipal: identificacao.length === 14 ? inscricaoMunicipal : null,
         };
 
         pessoa = await Pessoa.create(pessoaPayload);
     }
 
     // Criar o cliente associado à pessoa
     const clientePayload = {
         pessoaId: pessoa.id,
     };
 
     const cliente = await Cliente.create(clientePayload);
 
     res.json(cliente);
 }

// Função para listar todos os clientes
export async function getAllClients(req: Request, res: Response) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
}

// Função para listar um cliente por ID
export async function getClientById(req: Request, res: Response) {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
}

// Função para atualizar um cliente por ID
export async function updateClient(req: Request, res: Response) {
/**   const { id } = req.params;
    const { name, identificacao, tel, end, city, state, cep, nomeFantasia, nomeMae, inscricaoEstadual, inscricaoMunicipal } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (cliente.identificacao !== req.body.identificacao) {
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
    */ 
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

export default clienteControllers;


