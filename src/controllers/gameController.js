import Game from "../models/Game.js"
import { getGames, saveGame } from "../data/gameData.js"

let games = getGames();

export const getAllGames = (req,res) => {
    res.json(games);
}

export const getGame = (req,res) => {
    const id = parseInt(req.params.id);
    const juego = games.find(g => g.id === id);

    res.json(juego);
}

export const setGame = (req,res) => {
    let id = games.length === 0 ? 1 : games.length + 1; 
    let {name, category} = req.body;
    
    const juego = new Game(id, name, category)
    
    games.push(juego);

    saveGame(games)

    res.send("Juego creado con exito")
}

export const deleteGame = (req, res) => {
    const id = parseInt(req.params.id);

    games = games.filter(g => g.id !== id);

    addGame(games)

    res.send("Juego eliminado con exito");
}

export const modifyGame = (req,res) => {
    const {name, category} = req.body;
    const id = parseInt(req.params.id);
    const index = games.findIndex(g => g.id === id);

    games[index].name = name;
    games[index].category = category;

    addGame(games)

    res.send("Juego modificado con exito");
}