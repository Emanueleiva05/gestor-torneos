import express from "express"
import { getAllMatch, getMatch, setMatch, modifyMatch, deleteMatch, winnerMatch } from "../controllers/matchController.js"
import { validarPartidos, validarJugadoresDelPartido, validarIDjugador, validarIndiceTorneo } from "../middlewares/validacionesPartidos.js";

const router = express.Router();

//Listar todos los partidos
router.get("/", getAllMatch);

//Buscar un partido por su ID
router.get("/:id", validarPartidos,getMatch);

//Agregar un partido
router.post("/",validarIDjugador,validarJugadoresDelPartido,setMatch);

//Eliminar un partido segun un ID
router.delete("/:id", deleteMatch);

//Modificar un partido por su ID
router.put("/:id",validarIDjugador,validarIndiceTorneo,modifyMatch);

router.put("/:id/winner", validarIndiceTorneo,winnerMatch);

export default router;