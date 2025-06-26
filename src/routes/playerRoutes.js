import  express  from "express"
import { getAllPlayer, getPlayer, setPlayer, modifyPlayer, deletePlayer } from "../controllers/playerController.js"

const router = express.Router();

//Listar todos los jugadores
router.get("/", getAllPlayer);

//Buscar un jugador por su ID
router.get("/:id", getPlayer);

//Agregar un jugador
router.post("/", setPlayer);

//Eliminar un jugador segun un ID
router.delete("/:id", modifyPlayer);

//Modificar un jugador por su ID
router.put("/:id",deletePlayer);

export default router;