export class Player{
    constructor(id,name,level,game,victory,defeat,points){
        this.id = id;
        this.name= name;
        this.level = level;
        this.game = game;
        this.victory = victory;
        this.defeat = defeat;
        this.points = points;
    }

    winMatch(){
        this.points += 5;
        this.victory += 1;
    }

    loseMatch(){
        this.points -= 2;
        this.defeat += 1;
    }

    getStats(){
        return `Victorias ${this.victory}, Derrotas: ${this.defeat} y Puntuacion: ${this.points}`;
    }

    resetStats(){
        this.victory = 0;
        this.defeat = 0;
        this.points = 0;
    }

    
}