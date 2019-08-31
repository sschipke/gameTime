import data from './data.js';
import Player from './Player.js';

class Game {
  constructor(surveys, answers) {
    this.surveys = surveys;
    this.answers = answers;
    this.players = []; 
    this.roundCounter = 0;
  }

  addPlayers(p1, p2) {
    let player1 = new Player(1, p1);
    let player2 = new Player(2, p2);
    this.players.push(player1, player2);
  }
}

export default Game;