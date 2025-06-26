import express from "express"
import { getAllTournament, getTournament, setTournament, modifyTournament, deleteTournament } from "../controllers/tournamentController.js"

const router = express.Router();

//Listar todos los torneos
router.get("/", getAllTournament);

//Buscar un torneo por su ID
router.get("/:id", getTournament);

//Agregar un torneo
router.post("/", setTournament);

//Eliminar un torneo segun un ID
router.delete("/:id", deleteTournament);

//Modificar un torneo por su ID
router.put("/:id",modifyTournament);

export default router;