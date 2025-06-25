import express from "express"
import { getAllGames, getGame, setGame, modifyGame, deleteGame } from "../controllers/gameController.js"

const router = express.Router();

//Listar todos los juegos
router.get("/", getAllGames);

//Buscar un juego por su ID
router.get("/:id", getGame);

//Agregar un juego
router.post("/", setGame);

//Eliminar un juego segun un ID
router.delete("/:id", deleteGame);

//Modificar un juego por su ID
router.put("/:id",modifyGame);

export default router;