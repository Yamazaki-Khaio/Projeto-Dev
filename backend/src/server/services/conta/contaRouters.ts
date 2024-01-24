import { Router } from "express";
import  ContaController from "./contaController";

const routes = Router();

// Rotas da aplicação para criar uma conta e fazer login
routes.post('/', ContaController.create);
routes.post('/login', ContaController.login);
routes.put('/profile', ContaController.updateProfile);
routes.get('/profile', ContaController.getProfile);

export default routes;