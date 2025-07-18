import Game from "../models/Game.js"
import { getGames, saveGame } from "../data/gameData.js"
import { setID } from "../service/domainService.js"

export const getAllGames = (req,res) => {
    let games = getGames();
    res.json(games);
}

export const getGame = (req,res) => {
    try{
        let games = getGames();

        const id = parseInt(req.params.id);
        const juego = games.find(g => g.id === id);

        res.json(juego);
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const setGame = (req,res) => {
    try{
        let games = getGames();

        let id = setID(games);
        let {name, category} = req.body;

        const juego = new Game(id, name, category)
        games.push(juego);
        saveGame(games);;

        res.send("Juego creado con exito");

    }catch(error){
        res.status(400).send(error.message);
    }
}

export const deleteGame = (req, res) => {
    try{
        let games = getGames();

        const id = parseInt(req.params.id);

        if(!games.some(g => g.id === id)){
            throw new Error("No se encontro el juego a eliminar");
        };

        games = games.filter(g => g.id !== id);
    
        saveGame(games)
        res.send("Juego eliminado con exito");
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const modifyGame = (req,res) => {
    try{
        let games = getGames();

        const {name, category} = req.body;
        const id = parseInt(req.params.id);
        const index = games.findIndex(g => g.id === id);
    
        if(index === -1){
            throw new Error("El juego no fue encontrado");
        }

        games[index].name = name;
        games[index].category = category;
    
        saveGame(games)
        res.send("Juego modificado con exito");
    }catch(error){
        res.send(error.message);
    }
}