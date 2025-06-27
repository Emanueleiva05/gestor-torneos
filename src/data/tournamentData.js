import fs from "fs"

const PATH = "./src/data/JSON/torneo.json"

export function setTournaments(tournaments){
    fs.writeFileSync(PATH,JSON.stringify(tournaments, null,2));
}

export function getTournaments() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        let response = fs.readFileSync(PATH,"utf-8");
        let data = JSON.parse(response);
        return data
    }
}