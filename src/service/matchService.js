import Player from "../models/Player.js"
import {getTournaments} from "../data/tournamentData.js"
import {getPlayers} from "../data/playerData.js"
import {getMatches} from "../data/matchData.js"

let tournaments = getTournaments();
let players = getPlayers();
let matches = getMatches();

export function createObjectPlayer(player){
    const playerFS = players.find(p => p.id === player.id);

    if(!playerFS){
        throw new Error("No se encontro un jugador con ese ID");
    }

    let playerFound = new Player(playerFS.id,playerFS.name,playerFS.game);
    playerFound.defeat = playerFS.defeat;
    playerFound.level = playerFS.level;
    playerFound.victory = playerFS.victory;
    playerFound.points = playerFS.points;
    
    return playerFound;
}

export function guardarJugadores(matches, index) {
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