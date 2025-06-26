import fs from "fs"

const PATH = "./src/data/juegos.json"

export function addGame(games){
    fs.writeFileSync(PATH,JSON.stringify(games, null,2));
}

export function getGames() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        let response = fs.readFileSync(PATH,"utf-8");
        let data = JSON.parse(response);
        return data
    }
}