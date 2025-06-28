export default class Match {
  constructor(id, date, player1, player2, type) {
    this.id = id;
    this.date = date;
    this.player1 = player1;
    this.player2 = player2;
    this.winner = null;
    this.type = type;
  }

  simulateGame() {
    if (this.player1.level > this.player2.level) {
      this.winner = this.player1;
    } else if (this.player1.level < this.player2.level) {
      this.winner = this.player2;
    } else {
      this.chooseRamdom();
    }
    this.saveResult();
  }

  chooseRamdom() {
    const number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
      this.winner = this.player1;
    } else {
      this.winner = this.player2;
    }
  }

  saveResult() {
    if (this.winner === this.player1) {
      this.player1.winMatch();
      this.player1.levelUp();
      this.player2.loseMatch();
    } else {
      this.player2.winMatch();
      this.player1.loseMatch();
    }
  }

  summary() {
    return {
      date: this.date,
      player1: this.player1,
      player2: this.player2,
      winner: this.winner.name,
    };
  }
}
