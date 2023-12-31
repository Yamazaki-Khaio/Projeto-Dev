import express from 'express';
import clienteControllers from './clienteControllers';

const router = express.Router();

// Aplica o middleware de autenticação em todas as rotas
// Rota para criar um novo cliente
router.post('/', clienteControllers.create);

// Rota para buscar todos os clientes
router.get('/', clienteControllers.getAll);

// Rota para buscar um cliente pelo ID
router.get('/:id', clienteControllers.getById);

// Rota para atualizar um cliente pelo ID
router.put('/:id', clienteControllers.update);

// Rota para excluir um cliente pelo ID
router.delete('/:id', clienteControllers.delete);

export default router;