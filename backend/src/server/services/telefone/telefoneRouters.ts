import { Router } from "express";
import TelefoneController from "./telefoneControllers";
const router = Router();

router.post("/pessoa/:id_pessoa", TelefoneController.create);
router.get("/", TelefoneController.getAll);
router.get("/:id", TelefoneController.getTelefoneById);
router.get("/pessoa/:id_pessoa", TelefoneController.getTelefoneAllByIdPessoa);
router.put("/:id", TelefoneController.update);
router.delete("/:id", TelefoneController.delete);

export default router;

