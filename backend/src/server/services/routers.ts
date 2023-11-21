import { Router } from 'express';
import ContaRouters from './conta/contaRouters';
import ClienteRouters from './cliente/clienteRouters';
import RepresentanteRouters from './representante/representanteRouters';
//import PessoaRouters from './pessoa/pessoaRouters';
import EmailRouters from './email/emailRouters';
import TelefoneRouters from './telefone/telefoneRouters';
import EnderecoRouters from './endereco/enderecoRouters';


const router = Router();

router.use('/conta', ContaRouters)
    .use('/cliente', ClienteRouters)
    .use('/representante', RepresentanteRouters)
    //.use('/pessoa', PessoaRouters)
    .use('/email', EmailRouters)
    .use('/telefone', TelefoneRouters)
    .use('/endereco', EnderecoRouters);

export default router;
