import Player from "../models/Player.js"
import {getPlayers, savePlayers} from "../data/playerData.js"
import {getGames, saveGame} from "../data/gameData.js"

let players = getPlayers();
let games = getGames();

export const getAllPlayer = (req,res) => {
    res.json(players);
}

export const getPlayer = (req,res) => {
    const id = parseInt(req.params.id);
    const player = players.find(p => p.id === id);

    res.json(player);
}

export const setPlayer = (req,res) => {
    const id = players.length === 0 ? 1 : players.length + 1;
    const { name, idGame } = req.body;

    const game = games.find(g => g.id === parseInt(idGame));
    const player = new Player(id,name,game);

    players.push(player);

    savePlayers(players);
    res.send("Se creo el jugador con exito");
}

export const deletePlayer = (req, res) => {
    const id = parseInt(req.params.id);
    players = players.filter(p => p.id !== id);

    savePlayers(players);

    res.send("Se elimino el jugador con exito")
}

export const modifyPlayer = (req,res) => {
    const id = parseInt(req.params.id);
    const { name, idGame } = req.body;

    const game = games.find(g => g.id === parseInt(idGame));
    const index = players.findIndex(p => p.id === id)

    players[index].name = name;
    players[index].game = game;

    savePlayers(players);

    res.send("Se modifico el jugador con exito")
}