import express from 'express';
import { clienteControllers } from './clienteControllers';

export default router = express.Router();

// Rota para criar um novo cliente
router.post('/', clienteControllers.createClient);

// Rota para buscar todos os clientes
router.get('/', clienteControllers.getAllClients);

// Rota para buscar um cliente pelo ID
router.get('/:id', clienteControllers.getClientById);

// Rota para atualizar um cliente pelo ID
router.put('/:id', clienteControllers.updateClient);

// Rota para excluir um cliente pelo ID
router.delete('/:id', clienteControllers.deleteClient);

