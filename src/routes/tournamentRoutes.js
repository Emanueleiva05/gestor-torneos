import express from "express"
import { tournamentController } from "../controllers/tournamentController.js"

const router = express.Router();

//Listar todos los torneos
router.get("/", tournamentController);

//Buscar un torneo por su ID
router.get("/:id", tournamentController);

//Agregar un torneo
router.post("/", tournamentController);

//Eliminar un torneo segun un ID
router.delete("/:id", tournamentController);

//Modificar un torneo por su ID
router.put("/:id",tournamentController);

export default router;