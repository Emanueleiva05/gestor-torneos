import express from "express"
import { getAllTournament, getTournament, setTournament, modifyTournament, deleteTournament, addPlayer, createMatch, getAllPlayer, getAllMatches, deletePlayer, winnerMatch } from "../controllers/tournamentController.js"

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

router.put("/:idTournament/player/:idPlayer", addPlayer);

router.get("/:id/player", getAllPlayer);

router.delete("/:idTournament/player/:idPlayer", deletePlayer);

router.put("/:id/match", createMatch);

router.get("/:id/match", getAllMatches);

router.put("/:idTournament/match/:idMatch/winner", winnerMatch);

export default router;
