import express from "express"
import { getAllTournament, getTournament, setTournament, modifyTournament, deleteTournament, addPlayer, createMatch, getAllPlayer, getAllMatches, deletePlayer, winnerMatch, searchPlayer, bestPlayer } from "../controllers/tournamentController.js"

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

//Agregar un jugador al torneo
router.put("/:idTournament/player/:idPlayer", addPlayer);

//Listar todos los jugadores
router.get("/:id/player", getAllPlayer);

//Borrar jugador por id
router.delete("/:idTournament/player/:idPlayer", deletePlayer);

//Crear partida de torneo
router.put("/:id/match", createMatch);

//Ver todos los partidos del torneo
router.get("/:id/match", getAllMatches);

//Simular partido del torneo
router.put("/:idTournament/match/:idMatch/winner", winnerMatch);

//Ver mejor jugador del torneo
router.get("/:id/bestPlayer", bestPlayer);

//Bucar jugador por nombre
router.get("/:id/searchPlayer", searchPlayer);

export default router;
