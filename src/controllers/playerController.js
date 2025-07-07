import Player from "../models/Player.js"
import {getPlayers, savePlayers} from "../data/playerData.js"
import {getGames} from "../data/gameData.js"
import { createObjectPlayer, setID } from "../service/domainService.js";
import { getMatches } from "../data/matchData.js";

export const getAllPlayer = (req,res) => {
    let players = getPlayers();

    res.json(players);
}

export const getPlayer = (req,res) => {
    try{
        let players = getPlayers();

        const id = parseInt(req.params.id);
        const player = players.find(p => p.id === id);

        res.json(player);
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const setPlayer = (req,res) => {
    try{
        let players = getPlayers();
        let games = getGames();

        const id = setID(players);
        const { name, idGame } = req.body;
    
        const game = games.find(g => g.id === parseInt(idGame));

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
        let players = getPlayers();

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
        let players = getPlayers();
        let games = getGames();

        const id = parseInt(req.params.id);
        const { name, idGame } = req.body;
    
        const game = games.find(g => g.id === parseInt(idGame));
        const index = players.findIndex(p => p.id === id)
    
        if(index === -1){
            throw new Error("Jugador no encontrado");
        }

        players[index].name = name;
        players[index].game = game;
    
        savePlayers(players);
    
        res.send("Se modifico el jugador con exito")       
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const getPlayerByLevel = (req,res) => {
    try{
        let players = getPlayers();

        const level = parseInt(req.params.level);
        const playerLevels = players.filter(p => p.level === level);
    
        if(!playerLevels){
            throw new Error("No se encontraron jugadores con ese nivel");
        }

        return playerLevels;
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const getBestPlayerGlobal = (req,res) => {
    try{
        let players = getPlayers();

        const bestPlayer = players.reduce((max,act) => act.points > max.points ? max : act, 0);
    
        return bestPlayer;
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const blockPlayer = (req,res) => {
    try{
        let players = getPlayers();
        let id = parseInt(req.params.id);

        let player = players.find(p => p.id === id);

        player.block = true;
        savePlayers(players);

        res.send("Jugador bloqueado");
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const unblockPlayer = (req,res) => {
    try{
        let players = getPlayers();
        let id = parseInt(req.params.id);

        let player = players.find(p => p.id === id);

        player.block = false;

        savePlayers(players);
        res.send("Jugador desbloqueado");
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const matchesOfPlayer = (req, res) => {
    try{
        let matches = getMatches();
    
        const id = parseInt(req.params.id);
        const matchesPlayer = matches.filter(m => m.player1.id === id || m.player2.id === id);
    
        if(matchesPlayer.length === 0){
            throw new Error("Partidos de jugador no encontrados");
        }
    
        res.json(matchesPlayer);
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const bestPlayers = (req,res) => {
    try{
        let players = getPlayers();

        let bestPlayers = [...players].sort((a,b) => b.points - a.points).splice(0,5);
    
        if(bestPlayers.length === 0){
            throw new Error("No se encontraron jugador");
        }
    
        res.json(bestPlayers);    
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const ratioPlayer = (req,res) => {
    try{
        let players = getPlayers();
        const id = parseInt(req.params.id);
    
        const playerFind = players.find(p => p.id === id);

        const playerClass = createObjectPlayer(playerFind); 
    
        res.send(playerClass.ratio());
    }catch(error){
        res.status(404).send(error.message)
    }
}