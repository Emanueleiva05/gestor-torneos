import fs from "fs"
import Tournament from "../models/Tournament.js";

const PATH = "./src/data/JSON/torneo.json"

export function saveTournaments(tournaments){
    fs.writeFileSync(PATH,JSON.stringify(tournaments, null,2));
}

export function getTournaments() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        const response = fs.readFileSync(PATH,"utf-8");
        const data = JSON.parse(response);
        const tournaments = data.map(t => {
            let torneo = new Tournament(t.id, t.name);
            torneo.matches = t.matches;
            torneo.players = t.players;
            torneo.dateCreation = t.dateCreation;
            return torneo
        })
        return tournaments;
    }
}