import Match from "./Match.js"

export default class Tournament{
    constructor(id, name){
        this.id = id;
        this.players = [];
        this.matches = [];
        this.name = name;
        this.dateCreation = new Date();
    }

    agregarJugador(player){
        const encontrado = this.players.some(p => p.name === player.name)
        if(!encontrado || this.players.length === 0){
            this.players.push(player);
        }else{
            console.log("Jugador ya registrado")
        }
    }

    crearPartida(namePlayer1,namePlayer2){
        const id = this.matches.length === 0 ? 1 : this.matches.length + 1 
        const date = new Date();
        const type = "Torneo";

        const player1 = this.players.find(p => p.name === namePlayer1);
        const player2 = this.players.find(p => p.name === namePlayer2);

        return new Match(id,date,player1,player2,type);
    }

    listarJugadores(){
        return this.players;
    }

    verHistorial(){
        return this.matches;
    }

    buscarJugadorPorNombre(nombre){
        const player = this.players.find(p => p.name === nombre);
        return player;      
    }

    eliminarJugador(id){
        this.players = this.players.filter(p => p.id != id);
    }

    mejorJugador(){
        const player = this.players.reduce((maximo, actual) => { //Reduce tiene dos parametros el acumulador y el valor actual del array, entonces primero el maximo seria el elemento con mejor puntuacion y el segundo el jugador que se esta comparando 
            return actual.points > maximo.points ? actual : maximo;
        })

        return player; 
    }
}