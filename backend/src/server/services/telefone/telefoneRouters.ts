import { Router } from "express";
import TelefoneController from "./telefoneControllers";
const router = Router();

router.post("/:id_pessoa", TelefoneController.create);
router.get("/", TelefoneController.getAll);
router.get("/:id_pessoa", TelefoneController.getById);
router.put("/:id", TelefoneController.update);
router.delete("/:id", TelefoneController.delete);

export default router;

