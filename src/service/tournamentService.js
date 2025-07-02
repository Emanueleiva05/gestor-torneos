import {getMatches,saveMatches} from "../data/matchData.js"
import { createObjectPlayer } from "./matchService.js";
import { getPlayers,savePlayers } from "../data/playerData.js";

export function createObjectMatch(match){
    let matches = getMatches();

    const matchFS = matches.find(m => m.id === match.id);
    if(!matchFS){
        throw new Error("Partida no encontrada");
    }

    matchFS.player1 = createObjectPlayer(matchFS.player1);
    matchFS.player2 = createObjectPlayer(matchFS.player2);

    return matchFS
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