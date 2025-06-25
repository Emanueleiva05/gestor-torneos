import express from "express"
import { matchController } from "../controllers/matchController.js"

const router = express.Router();

//Listar todos los partidos
router.get("/", matchController);

//Buscar un partido por su ID
router.get("/:id", matchController);

//Agregar un partido
router.post("/", matchController);

//Eliminar un partido segun un ID
router.delete("/:id", matchController);

//Modificar un partido por su ID
router.put("/:id",matchController);

export default router;