import Match from "../models/Match.js"
import Player from "../models/Player.js"
import {getMatches, setMatches} from "../data/matchData.js"
import {getPlayers, savePlayers} from "../data/playerData.js"

let matches = getMatches();
let players = getPlayers();

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
    const { date, player1, player2 } = req.body;



    const match = new Match(id,date,player1,player2,"Amistoso");

    matches.push(match);

    setMatches(matches);

    res.send("Se creo el partido con exito");
}

export const deleteMatch = (req, res) => {
    const id = parseInt(req.params.id);
    matches = matches.filter(m => m.id !== id);

    setMatches(matches);

    res.send("Se elimino el partido con exito")
}

export const modifyMatch = (req,res) => {
    const id = parseInt(req.params.id);
    const { date, player1, player2 } = req.body;
    const index = matches.findIndex(m => m.id === id)

    matches[index].date = date;
    matches[index].player1 = player1;
    matches[index].player2 = player2;

    setMatches(matches);

    res.send("Se modifico el partido con exito")
};

export const winnerMatch = (req,res) => {
    
}