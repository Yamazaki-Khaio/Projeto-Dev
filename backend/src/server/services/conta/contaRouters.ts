import { Router } from "express";
import { ContaController } from "./contaController";

const routes = Router();

routes.post('/', ContaController.create);

export default routes;