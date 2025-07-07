import { getPlayers } from "../data/playerData.js";

export function validarJugador(req,res,next){
    const players = getPlayers();
    const id = parseInt(req.params.id);

    const player = players.find(p => p.id === id);

    if(!player){
        res.status(404).send("Jugador no encontrado");
    }

    next();
}