import Match from "../models/Match.js"
import {getMatches, saveMatches} from "../data/matchData.js"
import {getPlayers} from "../data/playerData.js"
import {createObjectPlayer, guardarJugadores, setID } from "../service/domainService.js"


export const getAllMatch = (req,res) => {
    let matches = getMatches();
    res.json(matches);
}

export const getMatch = (req,res) => {
    try{
        let matches = getMatches();

        const id = parseInt(req.params.id);
        const match = matches.find(m => m.id === id);
    
        res.json(match);
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const setMatch = (req,res) => {
    try{
        let players = getPlayers();
        let matches = getMatches();

        const id = setID(matches);
        const { date, idPlayer1, idPlayer2 } = req.body;

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
        let matches = getMatches();

        const id = parseInt(req.params.id);

        if(!matches.some(m => m.id === id)){
            throw new Error("No se encontro el partido a eliminar");
        };
    
        matches = matches.filter(m => m.id !== id);
        saveMatches(matches);
    
        res.send("Se elimino el partido con exito");
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const modifyMatch = (req,res) => {
    try{
        let matches = getMatches();
        let players = getPlayers();

        const id = parseInt(req.params.id);
        const { date, idPlayer1, idPlayer2 } = req.body;
    
        const player1 = players.find(p => p.id === parseInt(idPlayer1));
        const player2 = players.find(p => p.id === parseInt(idPlayer2));

        const index = matches.findIndex(m => m.id === id)
    
        matches[index].date = date;
        matches[index].player1 = player1;
        matches[index].player2 = player2;
    
        saveMatches(matches);
    
        res.send("Se modifico el partido con exito")
    }catch(error){
        res.status(404).send(error.message)
    }
};

export const winnerMatch = (req,res) => {
    try{
        let matches = getMatches();

        const id = parseInt(req.params.id);

        const index = matches.findIndex(m => m.id === id);
    
        if(matches[index].winner){
            throw new Error("No se puede volver a jugar la partida, ya tiene un ganador")
        }

        matches[index].player1 = createObjectPlayer(matches[index].player1)
        matches[index].player2 = createObjectPlayer(matches[index].player2)

        matches[index].simulateGame();

        saveMatches(matches);
        guardarJugadores(matches, index);
        
        res.send("Juego simulado");
    }catch(error){
        res.send(error.message)
    }
}