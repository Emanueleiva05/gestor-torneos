import fs from "fs"

const PATH = "./src/data/jugador.json"

export function setPlayers(players){
    fs.writeFileSync(PATH,JSON.stringify(players, null,2));
}

export function getPlayers() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        let response = fs.readFileSync(PATH,"utf-8");
        let data = JSON.parse(response);
        return data
    }
}