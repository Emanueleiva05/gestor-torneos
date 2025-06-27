import fs from "fs"
import Match from "../models/Match.js";

const PATH = "./src/data/JSON/partidos.json"

export function setMatches(matches){
    fs.writeFileSync(PATH,JSON.stringify(matches, null,2));
}

export function getMatches() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        let response = fs.readFileSync(PATH,"utf-8");
        let data = JSON.parse(response);
        const matches = data.map(m => new Match(m.id,m.date,m.player1,m.player2,m.type));
        return matches;
    }
}