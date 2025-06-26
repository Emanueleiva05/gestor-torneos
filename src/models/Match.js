export default class Match{
    constructor(id,date,player1,player2,type){
        this.id = id;
        this.date = date;
        this.player1 = player1;
        this.player2 = player2;
        this.winner = null;
        this.type = type;
        this.puntuacion = null;
    }

    simulateGame(){
        if(this.player1.level > this.player2.level){
            console.log("Jugador 1 fue el ganador");
            this.winner = this.player1;
        }else if(this.player1.level < this.player2.level){
            console.log("Jugador 2 fue el ganador");
            this.winner = this.player2;
        }else{
            this.chooseRamdom();
        }
        this.saveResult();
    }

    chooseRamdom(){
        const number = Math.random() * (2-1) + 1;
        if(number === 1){
            console.log("Jugador 1 fue el ganador");
            this.winner = this.player1;
        }else{
            console.log("Jugador 2 fue el ganador");
            this.winner = this.player2;
        }
    }

    saveResult(){
        if(this.winner === this.player1){
            this.player1.winMatch();
            this.player2.loseMatch();
        }else{
            this.player2.winMatch();
            this.player1.loseMatch();
        }
    }

    summary(){
        console.log("-------------------------------------");
        console.log(`Nombre del jugador 1: ${this.player1.name}`);
        console.log(`Nombre del jugador 2: ${this.player2.name}`);
        console.log(`Fecha: ${this.date}`);
        console.log(`Ganador: ${this.winner}`);
        console.log("-------------------------------------");
    }


}