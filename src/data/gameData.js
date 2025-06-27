import fs from "fs"
import Game from "../models/Game.js"

const PATH = "./src/data/JSON/juegos.json"

export function saveGame(games){
    fs.writeFileSync(PATH,JSON.stringify(games, null,2));
}

export function getGames() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        const response = fs.readFileSync(PATH,"utf-8");
        const data = JSON.parse(response);
        const games = data.map(g => new Game(g.id,g.name,g.category));
        return games
    }
}