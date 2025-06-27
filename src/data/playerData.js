import fs from "fs"
import Player from "../models/Player.js";

const PATH = "./src/data/JSON/jugador.json"

export function savePlayers(players){
    fs.writeFileSync(PATH,JSON.stringify(players, null,2));
}

export function getPlayers() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        const response = fs.readFileSync(PATH,"utf-8");
        const data = JSON.parse(response);
        const players = data.map(p => new Player(p.id,p.name,p.game));
        return players;
    }
}