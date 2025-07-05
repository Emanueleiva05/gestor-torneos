import  express  from "express"
import { getAllPlayer, getPlayer, setPlayer, modifyPlayer, deletePlayer, getPlayerByLevel, getBestPlayerGlobal } from "../controllers/playerController.js"

const router = express.Router();

//Listar todos los jugadores
router.get("/", getAllPlayer);

//Buscar un jugador por su ID
router.get("/:id", getPlayer);

//Agregar un jugador
router.post("/", setPlayer);

//Eliminar un jugador segun un ID
router.delete("/:id", deletePlayer);

//Modificar un jugador por su ID
router.put("/:id",modifyPlayer);

//Ver jugadores segun nivel 
router.get("/:level/level", getPlayerByLevel);

//Ver mejor jugador global
router.get("/bestPlayer",getBestPlayerGlobal);

export default router;