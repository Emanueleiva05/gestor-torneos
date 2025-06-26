import fs from "fs"

const PATH = "./src/data/partidos.json"

export function setMatches(matches){
    fs.writeFileSync(PATH,JSON.stringify(matches, null,2));
}

export function getMatches() {
    if(!fs.existsSync(PATH)){
        return []
    }else{
        let response = fs.readFileSync(PATH,"utf-8");
        let data = JSON.parse(response);
        return data
    }
}