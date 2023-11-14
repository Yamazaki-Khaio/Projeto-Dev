
import express from 'express';
import { ClienteController } from './clienteController';

const clienteRouter = express.Router();
const clienteController = new ClienteController();

clienteRouter.get('/', clienteController.getAllClientes);
clienteRouter.get('/:id', clienteController.getClienteById);
clienteRouter.post('/', clienteController.createCliente);
clienteRouter.put('/:id', clienteController.updateCliente);
clienteRouter.delete('/:id', clienteController.deleteCliente);

export { clienteRouter };
