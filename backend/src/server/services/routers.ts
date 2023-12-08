import { Router } from 'express';
import ContaRouters from './conta/contaRouters';
import ClienteRouters from './cliente/clienteRouters';
import RepresentanteRouters from './representante/representanteRouters';
//import PessoaRouters from './pessoa/pessoaRouters';
import EmailRouters from './email/emailRouters';
import TelefoneRouters from './telefone/telefoneRouters';
import EnderecoRouters from './endereco/enderecoRouters';
import { authMiddleware } from '../middleware/authMiddleware';


const router = Router();

router.use('/conta', ContaRouters,)
        .use((req, res, next) => authMiddleware(req as any, res, next))
        .use('/cliente', ClienteRouters)
        .use('/representante', RepresentanteRouters)
        //.use('/pessoa', PessoaRouters)
        .use('/email', EmailRouters)
        .use('/telefone', TelefoneRouters)
        .use('/endereco', EnderecoRouters);

export default router;
