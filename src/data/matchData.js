import fs from "fs"
import Match from "../models/Match.js";

const PATH = "./src/data/JSON/partidos.json"

export function saveMatches(matches){
    fs.writeFileSync(PATH,JSON.stringify(matches, null,2));
}

export function getMatches() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        const response = fs.readFileSync(PATH,"utf-8");
        const data = JSON.parse(response);
        const matches = data.map(m => {
           let match = new Match(m.id,m.date,m.player1,m.player2,m.type)
           match.winner = m.winner;
           return match;
        });
        return matches;
    }
}