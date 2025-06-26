import express from "express"
import { getAllMatch, getMatch, setMatch, modifyMatch, deleteMatch } from "../controllers/matchController.js"

const router = express.Router();

//Listar todos los partidos
router.get("/", getAllMatch);

//Buscar un partido por su ID
router.get("/:id", getMatch);

//Agregar un partido
router.post("/", setMatch);

//Eliminar un partido segun un ID
router.delete("/:id", deleteMatch);

//Modificar un partido por su ID
router.put("/:id",modifyMatch);

export default router;