import express from 'express';
import emailControllers from './emailControllers';
const router = express.Router();

// Rota para criar um novo email
router.post('/pessoa/:id_pessoa', emailControllers.create);

// Rota para buscar todos os emails
router.get('/', emailControllers.getAll);

// Rota para buscar um email pelo ID 
router.get('/:id', emailControllers.getById);

router.get('/pessoa/:id_pessoa', emailControllers.getAllByPessoa);

// Rota para atualizar um email pelo ID
router.put('/:id', emailControllers.update);

// Rota para excluir um email pelo ID
router.delete('/:id', emailControllers.delete);

export default router;


