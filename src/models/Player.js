export default class Player{
    constructor(id,name,game){
        this.id = id;
        this.name= name;
        this.level = 0;
        this.game = game;
        this.victory = null;
        this.defeat = null;
        this.points = null;
    }

    levelUp(){
        this.level += 1;
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