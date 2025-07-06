import {getMatches,saveMatches} from "../data/matchData.js"
import { getPlayers,savePlayers } from "../data/playerData.js";
import { getTournaments } from "../data/tournamentData.js";
import Match from "../models/Match.js";
import Player from "../models/Player.js"
import Tournament from "../models/Tournament.js";

export function createObjectTournament(torneo){
    const tournaments = getTournaments();

    const tournamentFind = tournaments.find(t => t.id === torneo.id)

    if(!tournamentFind){
        throw new Error("El torneo no se encontro");
    }

    let tournament = new Tournament(tournamentFind.id, tournamentFind.name);
    tournament.players = [...tournamentFind.players]; //Clono las arrays porque si modifico las del original o este se cambian en los dos
    tournament.matches = [...tournamentFind.matches];
    tournament.dateCreation = new Date();
    tournament.finalizar = tournamentFind.finalizar;

    return tournament
}

export function createObjectMatch(match){
    let matches = getMatches();

    const matchFS = matches.find(m => m.id === match.id);

    console.log(matchFS)

    if(!matchFS){
        throw new Error("Partida no encontrada");
    }

    let matchObject = new Match(matchFS.id, matchFS.date,matchFS.player1,matchFS.player2,matchFS.type);

    matchObject.player1 = createObjectPlayer(matchFS.player1);
    matchObject.player2 = createObjectPlayer(matchFS.player2);

    return matchObject;
}

export function saveMatch(match){
    let matches = getMatches();
    let players = getPlayers();

    const player1Index = players.findIndex(p => p.id === match.player1.id)
    const player2Index = players.findIndex(p => p.id === match.player2.id)
    const matchindex = matches.findIndex(m => m.id === match.id)

    players[player1Index] = match.player1;
    players[player2Index] = match.player2;
    matches[matchindex] = match;

    savePlayers(players)
    saveMatches(matches)
}

export function createObjectPlayer(player){
    let players = getPlayers();

    const playerFS = players.find(p => p.id === player.id);

    if(!playerFS){
        throw new Error("No se encontro un jugador con ese ID");
    }

    let playerFound = new Player(playerFS.id,playerFS.name,playerFS.game);
    playerFound.defeat = playerFS.defeat;
    playerFound.level = playerFS.level;
    playerFound.victory = playerFS.victory;
    playerFound.points = playerFS.points;
    playerFound.block = playerFS.block;
    
    return playerFound;
}

export function guardarJugadores(matches, index) {
    let players = getPlayers();

    const player1 = matches[index].player1;
    const player2 = matches[index].player2;

    const indexPlayer1 = players.findIndex((p) => p.id === player1.id);
    const indexPlayer2 = players.findIndex((p) => p.id === player2.id);

    if(indexPlayer1 === -1 || indexPlayer2 === -1){
        throw new Error("No se encontro alguno de los jugadores");
    }

    players[indexPlayer1] = player1;
    players[indexPlayer2] = player2;

    savePlayers(players);
}

export function setID(array){
    if(array.length === 0){
        return 1;
    }else{
        const id = array.reduce((max, act) => act.id > max ? act.id : max, 0);
        return id + 1; 
    }
}