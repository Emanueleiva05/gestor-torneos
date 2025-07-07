import express from "express"
import { getAllGames, getGame, setGame, modifyGame, deleteGame } from "../controllers/gameController.js"
import { validarJuego, validarAtributosJuego } from "../middlewares/validacionesJuegos.js";

const router = express.Router();

//Listar todos los juegos
router.get("/", getAllGames);

//Buscar un juego por su ID
router.get("/:id", validarJuego,getGame);

//Agregar un juego
router.post("/",validarAtributosJuego,setGame);

//Eliminar un juego segun un ID
router.delete("/:id", deleteGame);

//Modificar un juego por su ID
router.put("/:id",validarAtributosJuego,modifyGame);

export default router;