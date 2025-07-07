import  express  from "express"
import { getAllPlayer, getPlayer, setPlayer, modifyPlayer, deletePlayer, getPlayerByLevel, getBestPlayerGlobal, blockPlayer, unblockPlayer, matchesOfPlayer, bestPlayers, ratioPlayer } from "../controllers/playerController.js"
import { validarJuego } from "../middlewares/validacionesJuegos.js";
import { validarJugador } from "../middlewares/validacionesJugador.js";

const router = express.Router();

//Listar todos los jugadores
router.get("/", getAllPlayer);

//Buscar un jugador por su ID
router.get("/:id", validarJugador,getPlayer);

//Agregar un jugador
router.post("/", validarJuego,setPlayer);

//Eliminar un jugador segun un ID
router.delete("/:id", deletePlayer);

//Modificar un jugador por su ID
router.put("/:id",validarJuego,modifyPlayer);

//Ver jugadores segun nivel 
router.get("/:level/level", getPlayerByLevel);

//Ver mejor jugador global
router.get("/bestPlayer",getBestPlayerGlobal);

//Bloquear jugador
router.put("/:id/block", validarJugador,blockPlayer);

//Desbloquear jugador
router.put("/:id/unblock", validarJugador,unblockPlayer);

//Ver partidos de un jugador
router.get("/:id/matches", matchesOfPlayer);

//Ver mejores 5 jugadores
router.get("/bestPlayers", bestPlayers);

//Ver ratio de un jugador
router.get("/:id/ratio",validarJugador,ratioPlayer);

export default router;