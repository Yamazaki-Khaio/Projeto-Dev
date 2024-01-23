import express from 'express';
import enderecoControllers from './enderecoControllers';


const router = express.Router();

// Rota para criar um novo endereço
router.post('/pessoa/:id_pessoa', enderecoControllers.createEndereco);

// Rota para buscar todos os clientes
router.get('/', enderecoControllers.getEnderecos);

//rota para buscar um endereço pelo ID
router.get('/:id', enderecoControllers.getEndereco);

// Rota para buscar todos endereço pelo ID da pessoa
router.get('/pessoa/:id_pessoa', enderecoControllers.getEnderecoAllByPessoa);

// Rota para atualizar um endereço pelo ID
router.put('/:id', enderecoControllers.updateEndereco);

// Rota para excluir um endereço pelo ID
router.delete('/:id', enderecoControllers.deleteEndereco);

export default router;