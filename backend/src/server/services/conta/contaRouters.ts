import { Router } from "express";
import ContaController from "./contaController";
import { authMiddleware } from "../../middleware/authMiddleware";

const routes = Router();

// Rotas da aplicação para criar uma conta e fazer login
routes.post('/', ContaController.create);
routes.post('/login', ContaController.login);
routes.use((req, res, next) => authMiddleware(req as any, res, next))
routes.put('/profile', ContaController.updateProfile);
routes.get('/profile', ContaController.getProfile);

export default routes;