import { getGames } from "../data/gameData.js";

export function validarJuego(req,res,next) {
    const games = getGames();
    const id = parseInt(req.params.id);

    const game = games.find(g => g.id === id);

    if(!game){
        return res.status(404).send("Juego no encontrado")
    }

    next() //Seguimos a la siguiente funcion
}

export function validarAtributosJuego(req,res,next){
    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).send("Falto ingresar el nombre o categoria")
    }

    if(typeof name !== "string" || typeof category !== "string"){
        return res.status(400).send("Una de las variables no es una cadena de texto")
    }

    next();
}