import Tournament from "../models/Tournament.js"
import {getTournaments, saveTournaments} from "../data/tournamentData.js"

let tournaments = getTournaments();

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

    setTournaments(tournaments);

    res.send("Se elimino el torneo con exito")
}

export const modifyTournament = (req,res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = tournaments.findIndex(t => t.id === id)

    tournaments[index].name = name;

    setTournaments(tournaments);

    res.send("Se modifico el torneo con exito")
}