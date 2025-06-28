import Player from "../models/Player.js"
import {getPlayers, savePlayers} from "../data/playerData.js"
import {getGames} from "../data/gameData.js"

let players = getPlayers();
let games = getGames();

export const getAllPlayer = (req,res) => {
    res.json(players);
}

export const getPlayer = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const player = players.find(p => p.id === id);
    
        if(!player){
            throw new Error("Jugador no encontrado");
        }

        res.json(player);
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const setPlayer = (req,res) => {
    try{
        const id = players.length === 0 ? 1 : players.length + 1;
        const { name, idGame } = req.body;
    
        const game = games.find(g => g.id === parseInt(idGame));

        if(!game){
            throw new Error("Juego no encontrado");
        }

        const player = new Player(id,name,game);
    
        players.push(player);
    
        savePlayers(players);
        res.send("Se creo el jugador con exito");
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const deletePlayer = (req, res) => {
    try{
        const id = parseInt(req.params.id);

        if(!players.some(p => p.id === id)){
            throw new Error("Jugador no encontrado");
        }

        players = players.filter(p => p.id !== id);
    
        savePlayers(players);
    
        res.send("Se elimino el jugador con exito")
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const modifyPlayer = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const { name, idGame } = req.body;
    
        const game = games.find(g => g.id === parseInt(idGame));
        const index = players.findIndex(p => p.id === id)
    
        if(index === -1){
            throw new Error("Jugador no encontrado");
        }

        if(!game){
            throw new Error("Juego no encontrado")
        }

        players[index].name = name;
        players[index].game = game;
    
        savePlayers(players);
    
        res.send("Se modifico el jugador con exito")       
    }catch(error){
        res.status(404).send(error.message);
    }
}