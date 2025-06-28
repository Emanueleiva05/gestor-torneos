import Tournament from "../models/Tournament.js"
import {getTournaments, saveTournaments} from "../data/tournamentData.js"
import {getPlayers, savePlayers} from "../data/playerData.js"
import {getMatches, saveMatches} from "../data/matchData.js"

let tournaments = getTournaments();
let players = getPlayers();
let matches = getMatches();

export const getAllTournament = (req,res) => {
    res.json(tournaments);
}

export const getTournament = (req,res) => {
    const id = parseInt(req.params.id);
    const tournament = tournaments.find(t => t.id === id);

    res.json(tournament);
}

export const setTournament = (req,res) => {
    const id = tournaments.length === 0 ? 1 : tournaments.length + 1;
    const { name } = req.body;

    const tournament = new Tournament(id,name);

    tournaments.push(tournament);
    saveTournaments(tournaments);

    res.send("Se creo el Torneo con exito");
}

export const deleteTournament = (req, res) => {
    const id = parseInt(req.params.id);
    tournaments = tournaments.filter(t => t.id !== id);

    saveTournaments(tournaments);
    res.send("Se elimino el torneo con exito")
}

export const modifyTournament = (req,res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = tournaments.findIndex(t => t.id === id)

    tournaments[index].name = name;
    saveTournaments(tournaments);

    res.send("Se modifico el torneo con exito")
}

export const addPlayer = (req, res) => {
    const idTournament = req.params.idTournament;
    const idPlayer = req.params.idPlayer;
    const player = players.find(p => p.id === parseInt(idPlayer));
    const indexTournament = tournaments.findIndex(t => t.id === parseInt(idTournament));

    tournaments[indexTournament].agregarJugador(player);
    saveTournaments(tournaments);

    res.send("Jugador agregado correctamente")
}

export const getAllPlayer = (req, res) => {
    const idTournament = req.params.id;
    const index = tournaments.findIndex(t => t.id === parseInt(idTournament));

    res.json(tournaments[index].listarJugadores());
}

export const deletePlayer = (req,res) => {
    const idTournament = req.params.idTournament;
    const idPlayer = req.params.idPlayer;
    const indexTournament = tournaments.findIndex(t => t.id === parseInt(idTournament));

    tournaments[indexTournament].eliminarJugador(idPlayer);
    saveTournaments(tournaments);

    res.send("Jugador eliminado");
}

export const createMatch = (req,res) => {
    
}

export const getAllMatches = (req, res) => {
    const idTournament = req.params.id;
    const index = tournaments.findIndex(t => t.id === parseInt(idTournament));

    res.json(tournaments[index].verHistorial());
}