import Tournament from "../models/Tournament.js"
import {getTournaments, saveTournaments} from "../data/tournamentData.js"
import {getPlayers} from "../data/playerData.js"
import {getMatches, saveMatches} from "../data/matchData.js"
import { createObjectMatch, saveMatch, setID,createObjectTournament } from "../service/domainService.js"

export const getAllTournament = (req,res) => {
    let tournaments = getTournaments();

    res.json(tournaments);
}

export const getTournament = (req,res) => {
    try{
        let tournaments = getTournaments();

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
        let tournaments = getTournaments();

        const id = setID(tournaments);
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
        let tournaments = getTournaments();

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
        let tournaments = getTournaments();

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
        let tournaments = getTournaments();
        let players = getPlayers();

        const idTournament = req.params.idTournament;
        const idPlayer = req.params.idPlayer;
        const player = players.find(p => p.id === parseInt(idPlayer));
        const indexTournament = tournaments.findIndex(t => t.id === parseInt(idTournament));

        if(!player){
            throw new Error("Jugador no encontrado");
        }

        if(player.block === true){
            throw new Error("Jugador blockeado no es posible ingresarlo en el torneo")
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
        let tournaments = getTournaments();

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
        let tournaments = getTournaments();
        let players = getPlayers();

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
        let tournaments = getTournaments();
        let matches = getMatches();

        const {namePlayer1, namePlayer2 } = req.body;
        const id = parseInt(req.params.id);
        const index = tournaments.findIndex(t => t.id === id);
    
        if(index === -1){
            throw new Error("No se encontro del torneo");
        }

        if(tournaments[index].finalizar === true){
            throw new Error("El torneo ya finalizo")
        }
    
        const match = tournaments[index].crearPartida(namePlayer1, namePlayer2);
        
        matches.push(match);
        tournaments[index].matches.push(match)

        saveMatches(matches);
        saveTournaments(tournaments)

        res.send("Se creo el partido");
    }catch(error){
        res.status(404).send(error.message);
    }
}

export const getAllMatches = (req, res) => {
    try{
        let tournaments = getTournaments();

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

export const winnerMatch = (req, res) => {
    try{
        let tournaments = getTournaments();

        const idTournament = parseInt(req.params.idTournament);
        const idMatch = parseInt(req.params.idMatch);
    
        const indexTournament = tournaments.findIndex(t => t.id === idTournament);
        

        if (indexTournament === -1) {
            return res.status(404).json({ error: "Torneo no encontrado" });
        }
        
        const match = tournaments[indexTournament].matches.find(m => m.id === idMatch);

        if (!match) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }

        if (match.winner) {
            return res.status(400).json({ error: "El partido ya tiene ganador" });
        }

        let matchFound = createObjectMatch(match);
        
        matchFound.simulateGame();
        
        saveTournaments(tournaments);        
        saveMatch(matchFound);

        res.send("Partido simulado correctamente")
    }catch(error){
        res.send(error.message);
    }
}

export const bestPlayer = (req,res) => {
    try{
        let tournaments = getTournaments();
        const id = parseInt(req.params.id);
    
        const tournamentFind = tournaments.find(t => t.id === id);

        if(!tournamentFind){
            throw new Error("No se encontro del torneo");
        }

        let tournament = createObjectTournament(tournamentFind);

        res.json(tournament.mejorJugador());

    }catch(error){
        res.status(404).send(error.message)
    }
}

export const searchPlayer = (req,res) => {
    try{
        let tournaments = getTournaments();
        const id = parseInt(req.params.id);
        const { name } = req.body
    
        const tournamentFind = tournaments.find(t => t.id === id);

        if(!tournamentFind){
            throw new Error("No se encontro del torneo");
        }

        let tournament = createObjectTournament(tournamentFind);

        res.json(tournament.buscarJugadorPorNombre(name));

    }catch(error){
        res.status(404).send(error.message)
    }
}

export const closeTournament = (req,res) => {
    try{
        let tournaments = getTournaments();
        const id = parseInt(req.params.id);
    
        const index = tournaments.findIndex(t => t.id === id);
        if(index === -1){
            throw new Error("No se encontro del torneo");
        }
    
        tournaments[index].finalizar = true;
    
        saveTournaments(tournaments);
    
        res.send("Torneo cerrado");
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const openTournament = (req,res) => {
    try{
        let tournaments = getTournaments();
        const id = parseInt(req.params.id);
    
        const index = tournaments.findIndex(t => t.id === id);
        if(index === -1){
            throw new Error("No se encontro del torneo");
        }
    
        tournaments[index].finalizar = false;
    
        saveTournaments(tournaments);
    
        res.send("Torneo abierto");
    }catch(error){
        res.status(404).send(error.message)
    }
}

export const cloneTournament = (req,res) => {
    try{
        let tournaments = getTournaments();

        const id = parseInt(req.params.id);
        let tournament = tournaments.find(t => t.id === id);
    
        if(!tournament){
            throw new Error("Torneo no encontrado");
        }

        const newId = setID(tournaments);

        let newTournament = createObjectTournament(tournament);
        newTournament.id = newId;
        newTournament.matches = []

        tournaments.push(newTournament);
        saveTournaments(tournaments);

        res.send("Torneo copiado")
    }catch(error){
        res.status(404).send(error.message)
    }
}