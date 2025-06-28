import Game from "../models/Game.js"
import { getGames, saveGame } from "../data/gameData.js"

let games = getGames();

export const getAllGames = (req,res) => {
    res.json(games);
}

export const getGame = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const juego = games.find(g => g.id === id);
    
        if(!juego){
            throw new Error("No se encontro un juego con ese ID");
        }

        res.json(juego);
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const setGame = (req,res) => {
    try{
        let id = games.length === 0 ? 1 : games.length + 1; 
        let {name, category} = req.body;
        
        if (!name || !category) throw new Error("Faltan datos obligatorios");

        if(typeof name !== "string" || typeof category !== "string"){
            throw new Error("Una de las variables no es una cadena de texto")
        }

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
        const {name, category} = req.body;
        const id = parseInt(req.params.id);
        const index = games.findIndex(g => g.id === id);
    
        if(index === -1){
            throw new Error("El juego no fue encontrado");
        }

        if (!name || !category) throw new Error("Faltan datos obligatorios");

        if(typeof name !== "string" || typeof category !== "string"){
            throw new Error("Una de las variables no es una cadena de texto")
        }

        games[index].name = name;
        games[index].category = category;
    
        saveGame(games)
        res.send("Juego modificado con exito");
    }catch(error){
        res.send(error.message);
    }
}