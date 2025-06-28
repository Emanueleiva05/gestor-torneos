import Match from "../models/Match.js"
import Player from "../models/Player.js"
import {getMatches, saveMatches} from "../data/matchData.js"
import {getPlayers, savePlayers} from "../data/playerData.js"

let matches = getMatches();
let players = getPlayers();

function createObjectPlayer(player){
    try{
        const playerFS = players.find(p => p.id === player.id);

        if(!playerFS){
            throw new Error("No se encontro un jugador con ese ID");
        }

        let playerFound = new Player(playerFS.id,playerFS.name,playerFS.game);
        playerFound.defeat = playerFS.defeat;
        playerFound.level = playerFS.level;
        playerFound.victory = playerFS.victory;
        playerFound.points = playerFS.points;
    
        return playerFound;
    }catch(error){
        return error.message;
    }
}

export const getAllMatch = (req,res) => {
    res.json(matches);
}

export const getMatch = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const match = matches.find(m => m.id === id);

        if(!match){
            throw new Error("No se encontro un partido con ese ID");
        }
    
        res.json(match);
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const setMatch = (req,res) => {
    try{
        const id = matches.length === 0 ? 1 : matches.length + 1;
        const { date, idPlayer1, idPlayer2 } = req.body;
    
        if(typeof idPlayer1 !== "number" || typeof idPlayer2 !== "number"){
            throw new Error("Algunas de las ids mandadas no es un number")
        }

        const player1 = players.find(p => p.id === parseInt(idPlayer1));
        const player2 = players.find(p => p.id === parseInt(idPlayer2));
    
        const match = new Match(id,date,player1,player2,"Amistoso");
    
        matches.push(match);
        saveMatches(matches);
    
        res.send("Se creo el partido con exito");
    }catch(error){
        res.status(400).send(error.message)
    }
}

export const deleteMatch = (req, res) => {
    try{
        const id = parseInt(req.params.id);

        if(!matches.some(m => m.id === id)){
            throw new Error("No se encontro el partido a eliminar");
        };
    
        matches = matches.filter(m => m.id !== id);
        savePlayers(matches);
    
        res.send("Se elimino el partido con exito");
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const modifyMatch = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const { date, idPlayer1, idPlayer2 } = req.body;
    
        const player1 = players.find(p => p.id === parseInt(idPlayer1));
        const player2 = players.find(p => p.id === parseInt(idPlayer2));
        
        const index = matches.findIndex(m => m.id === id)
    
        if(index === -1){
            throw new Error("Partido no encontrado");
        }
    
        matches[index].date = date;
        matches[index].player1 = player1;
        matches[index].player2 = player2;
    
        savePlayers(matches);
    
        res.send("Se modifico el partido con exito")
    }catch(error){
        res.status(404).send(error.message)
    }
};

//Agregar que no se permita mas esto a un partido con winner ya puesto
export const winnerMatch = (req,res) => {
    try{
        const id = parseInt(req.params.id);

        const index = matches.findIndex(m => m.id === id);

        if(index === -1){
            throw new Error("Partido no encontrado");
        }
    
        matches[index].player1 = createObjectPlayer(matches[index].player1)
        matches[index].player2 = createObjectPlayer(matches[index].player2)

        if(matches[index].player1 === "No se encontro un jugador con ese ID" || matches[index].player1 === "No se encontro un jugador con ese ID"){
            throw new Error("Jugador no encontrado");
        }
    
        matches[index].simulateGame();
    
        res.send("Juego simulado");
    }catch(error){
        res.status(404).send(error.message)
    }
}
