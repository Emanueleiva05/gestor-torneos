import Tournament from "../models/Tournament.js"
import {getTournaments, saveTournaments} from "../data/tournamentData.js"
import {getPlayers} from "../data/playerData.js"
import {getMatches, saveMatches} from "../data/matchData.js"
import { type } from "express/lib/response.js";

let tournaments = getTournaments();
let players = getPlayers();
let matches = getMatches();

export const getAllTournament = (req,res) => {
    res.json(tournaments);
}

export const getTournament = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const tournament = tournaments.find(t => t.id === id);

        if(!tournament){
            throw new Error("Torneo no encontrado");
        }
    
        res.json(tournament);
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const setTournament = (req,res) => {
    try{
        const id = tournaments.length === 0 ? 1 : tournaments.length + 1;
        const { name } = req.body;
    
        if(!name){
            throw new Error("Ingrese un nombre");
        }

        if(typeof name !== "string"){
            throw new Error("El nombre debe ser una string")
        }

        const tournament = new Tournament(id,name);
    
        tournaments.push(tournament);
        saveTournaments(tournaments);
    
        res.send("Se creo el Torneo con exito");
    }catch(error){
        res.status(400).send(error.message);
    }
}

export const deleteTournament = (req, res) => {
    try{
        const id = parseInt(req.params.id);

        if(!tournaments.some(t => t.id === id)){
            throw new Error("Torneo no encontrado");
        }

        tournaments = tournaments.filter(t => t.id !== id);
    
        saveTournaments(tournaments);
        res.send("Se elimino el torneo con exito")
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const modifyTournament = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const { name } = req.body;
        
        if(!name){
            throw new Error("Ingrese un nombre");
        }

        if(typeof name !== "string"){
            throw new Error("El nombre debe ser una string")
        }
        
        const index = tournaments.findIndex(t => t.id === id)
    
        if(index === -1){
            throw new Error("Torneo no encontrado");
        }

        tournaments[index].name = name;
        saveTournaments(tournaments);
    
        res.send("Se modifico el torneo con exito")
    }catch(error){
        res.status(400).send(error.message);
    }
}

export const addPlayer = (req, res) => {
    try{
        const idTournament = req.params.idTournament;
        const idPlayer = req.params.idPlayer;
        const player = players.find(p => p.id === parseInt(idPlayer));
        const indexTournament = tournaments.findIndex(t => t.id === parseInt(idTournament));

        if(!player){
            throw new Error("Jugador no encontrado");
        }

        if(indexTournament === -1){
            throw new Error("Torneo no encontrado");
        }
    
        tournaments[indexTournament].agregarJugador(player);
        saveTournaments(tournaments);
    
        res.send("Jugador agregado correctamente")
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const getAllPlayer = (req, res) => {
   try{
        const idTournament = req.params.id;
        const index = tournaments.findIndex(t => t.id === parseInt(idTournament));

        if(index === -1){
            throw new Error("Torneo no encontrado")
        }

        res.json(tournaments[index].listarJugadores());
   }catch(error){
        res.status(404).send(error.message);
   }
}

export const deletePlayer = (req,res) => {
    try{
        const idTournament = req.params.idTournament;
        const idPlayer = req.params.idPlayer;
        const indexTournament = tournaments.findIndex(t => t.id === parseInt(idTournament));
    
        if(!players.some(p => p.id == idPlayer)){
            throw new Error("Jugador no encontrado");
        }

        if(indexTournament === -1){
            throw new Error("Torneo no encontrado");
        }

        tournaments[indexTournament].eliminarJugador(idPlayer);
        saveTournaments(tournaments);
    
        res.send("Jugador eliminado");
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const createMatch = (req,res) => {
    try{
        const {namePlayer1, namePlayer2 } = req.body;
        const id = parseInt(req.params.id);
        const index = tournaments.findIndex(t => t.id === id);
    
        if(index === -1){
            throw new Error("No se encontro del torneo");
        }
    
        const match = tournaments[index].crearPartida(namePlayer1, namePlayer2);
    
        matches.push(match);
        saveMatches(matches);
        
        res.send("Se creo el partido");
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const getAllMatches = (req, res) => {
    try{
        const idTournament = req.params.id;
        const index = tournaments.findIndex(t => t.id === parseInt(idTournament));
        
        if(index === -1){
            throw new Error("No se encontro del torneo");
        }

        res.json(tournaments[index].verHistorial());
    }catch(error){
        res.status(404).send(error.message);
    }
}