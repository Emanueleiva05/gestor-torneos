import  express  from "express"
import { playerController } from "../controllers/playerController.js"

const router = express.Router();

//Listar todos los jugadores
router.get("/", playerController);

//Buscar un jugador por su ID
router.get("/:id", playerController);

//Agregar un jugador
router.post("/", playerController);

//Eliminar un jugador segun un ID
router.delete("/:id", playerController);

//Modificar un jugador por su ID
router.put("/:id",playerController);

export default router;