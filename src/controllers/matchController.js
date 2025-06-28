import Match from "../models/Match.js"
import Player from "../models/Player.js"
import {getMatches, saveMatches} from "../data/matchData.js"
import {getPlayers, savePlayers} from "../data/playerData.js"

let matches = getMatches();
let players = getPlayers();

function createObjectPlayer(player){
    const playerFS = players.find(p => p.id === player.id);
    
    let playerFound = new Player(playerFS.id,playerFS.name,playerFS.game);
    playerFound.defeat = playerFS.defeat;
    playerFound.level = playerFS.level;
    playerFound.victory = playerFS.victory;
    playerFound.points = playerFS.points;

    return playerFound;
}

export const getAllMatch = (req,res) => {
    res.json(matches);
}

export const getMatch = (req,res) => {
    const id = parseInt(req.params.id);
    const match = matches.find(m => m.id === id);

    res.json(match);
}

export const setMatch = (req,res) => {
    const id = matches.length === 0 ? 1 : matches.length + 1;
    const { date, idPlayer1, idPlayer2 } = req.body;

    const player1 = players.find(p => p.id === parseInt(idPlayer1));
    const player2 = players.find(p => p.id === parseInt(idPlayer2));

    const match = new Match(id,date,player1,player2,"Amistoso");

    matches.push(match);
    saveMatches(matches);

    res.send("Se creo el partido con exito");
}

export const deleteMatch = (req, res) => {
    const id = parseInt(req.params.id);
    matches = matches.filter(m => m.id !== id);

    savePlayers(matches);

    res.send("Se elimino el partido con exito")
}

export const modifyMatch = (req,res) => {
    const id = parseInt(req.params.id);
    const { date, idPlayer1, idPlayer2 } = req.body;

    const player1 = players.find(p => p.id === parseInt(idPlayer1));
    const player2 = players.find(p => p.id === parseInt(idPlayer2));
    
    const index = matches.findIndex(m => m.id === id)

    matches[index].date = date;
    matches[index].player1 = player1;
    matches[index].player2 = player2;

    savePlayers(matches);

    res.send("Se modifico el partido con exito")
};

//Agregar que no se permita mas esto a un partido con winner ya puesto
export const winnerMatch = (req,res) => {
    const id = parseInt(req.params.id);

    const index = matches.findIndex(m => m.id === id);

    matches[index].player1 = createObjectPlayer(matches[index].player1)
    matches[index].player2 = createObjectPlayer(matches[index].player2)

    matches[index].simulateGame();

    res.send("Juego simulado")
}
