import Game from "../data/Game.js"

let games = [];

export const getAllGames = (req,res) => {
    res.json(games);
}

export const getGame = (req,res) => {
    const id = req.params.id;

    res.json(games.find(g => g.id === id));
}

export const setGame = (req,res) => {
    let id = games.length === 0 ? 0 : games.length + 1; 
    let name = req.params.name;
    let category = req.params.category;
    
    const juego = new Game(id, name, category)
    
    games.push(juego);

    res.send("Juego creado con exito")
}

export const deleteGame = (req, res) => {

}

export const modifyGame = (req,res) => {

}