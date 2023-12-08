import express from 'express';
import enderecoControllers from './enderecoControllers';


const router = express.Router();

// Rota para criar um novo cliente
router.post('/:id_pessoa', enderecoControllers.createEndereco);

// Rota para buscar todos os clientes
router.get('/', enderecoControllers.getEnderecos);

// Rota para buscar um cliente pelo ID
router.get('/:id_pessoa', enderecoControllers.getEnderecoById);

// Rota para atualizar um cliente pelo ID
router.put('/:id', enderecoControllers.updateEndereco);

// Rota para excluir um cliente pelo ID
router.delete('/:id', enderecoControllers.deleteEndereco);

export default router;