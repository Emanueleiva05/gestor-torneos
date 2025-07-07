import { getMatches } from "../data/matchData.js";
import { getPlayers } from "../data/playerData.js";

export function validarPartidos(req,res,next){
    const matches = getMatches();

    const id = parseInt(req.params.id);
    const match = matches.find(m => m.id === id);

    if(!match){
        return res.status(404).send("No se encontro el partido");
    }

    next();
}

export function validarIndiceTorneo(req,res,next){
    const matches = getMatches();

    const id = parseInt(req.params.id);

    const index = matches.findIndex(m => m.id === id);

    if(index === -1){
        return res.status(404).send("Partida no encontrada")
    }

    next()
}

export function validarIDjugador(req,res,next){
    const players = getPlayers();

    const { idPlayer1, idPlayer2 } = req.body;

    if(typeof idPlayer1 !== "number" || typeof idPlayer2 !== "number"){
        return res.status(400).send("Algunas de las ids mandadas no es un number");
    }
    
    const player1 = players.find(p => p.id === parseInt(idPlayer1));
    const player2 = players.find(p => p.id === parseInt(idPlayer2));
    
    if(!player1 || !player2){
        return res.status(404).send("No se encontro el jugador")
    }
    
    next()
}

export function validarJugadoresDelPartido(req,res,next){
    const players = getPlayers();

    const { idPlayer1, idPlayer2 } = req.body;
    
    const player1 = players.find(p => p.id === parseInt(idPlayer1));
    const player2 = players.find(p => p.id === parseInt(idPlayer2));

    if(player1.block === true){
        return res.status(400).send("Jugador 1 blockeado no es posible ingresarlo en el torneo")
    }

    if(player2.block === true){
        return res.status(400).send("Jugador 2 blockeado no es posible ingresarlo en el torneo")
    }

    next();
}