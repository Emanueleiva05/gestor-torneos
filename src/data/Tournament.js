import { Match } from "./Match.js"

export class Tournament{
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
        const id = this.matches.length === 0 ? 0 : this.matches.length + 1 
        const date = new Date();
        const type = "Torneo";

        const player1 = this.players.find(p => p.name === namePlayer1);
        const player2 = this.players.find(p => p.name === namePlayer2);

        this.matches.push(new Match(id,date,player1,player2,type));
    }

    listarJugadores(){
        this.players.forEach(p => {
            console.log("--------------------------------");
            console.log(`Nombre: ${p.name}`);
            console.log(`Nivel: ${p.level}`);
            console.log(`Victorias: ${p.victory}`);
            console.log(`Derrotas: ${p.defeat}`);
            console.log(`Puntos: ${p.points}`);
        })
    }

    verHistorial(){
        this.matches.forEach(m => {
            console.log("--------------------------------");
            console.log(`Fecha: ${m.date}`);
            console.log(`Jugador 1: ${m.player1.name}`);
            console.log(`Jugador 2: ${m.player2.name}`);
            console.log(`Ganador: ${m.winner}`);
            console.log(`Tipo: ${m.type}`);
        })
    }

    buscarJugadorPorNombre(nombre){
        const player = this.players.find(p => p.name === nombre);
        console.log("--------------------------------");
        console.log(`Nombre: ${player.name}`);
        console.log(`Nivel: ${player.level}`);
        console.log(`Victorias: ${player.victory}`);
        console.log(`Derrotas: ${player.defeat}`);
        console.log(`Puntos: ${player.points}`);  
        console.log("--------------------------------");        
    }

    eliminarJugador(id){
        this.players = this.players.filter(p => p.id != id);
    }

    mejorJugador(){
        const player = this.players.reduce((maximo, actual) => { //Reduce tiene dos parametros el acumulador y el valor actual del array, entonces primero el maximo seria el elemento con mejor puntuacion y el segundo el jugador que se esta comparando 
            return actual.points > maximo.points ? actual : maximo;
        })

        console.log("--------------------------------");
        console.log(`Nombre: ${player.name}`);
        console.log(`Nivel: ${player.level}`);
        console.log(`Victorias: ${player.victory}`);
        console.log(`Derrotas: ${player.defeat}`);
        console.log(`Puntos: ${player.points}`);  
        console.log("--------------------------------");   
    }
}