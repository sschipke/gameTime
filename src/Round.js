import data from './data.js';
import Game from './Game.js'
import Player from './Player.js';
// import FastMoney from './FastMoney.js';

class Round {
  constructor(survey, answers, players) {
    this.survey = survey;
    this.answers = answers;
    this.correctGuesses = [];
    this.player1 = players[0];
    this.player2 = players[1];
    this.currentPlayer;
    this.turnCounter = 1;
  }
  determineCurrentPlayer() {
    if (this.turnCounter % 2 === 0) {
      this.currentPlayer = this.player2;
      return this.player2;
    } else {
      this.currentPlayer = this.player1;
      return this.player1;
    }
  }

  submitGuess(guess) {
    let player = this.determineCurrentPlayer();
    let index = this.answers.findIndex(answerObj => 
      answerObj.answer.toUpperCase() === guess.toUpperCase()
    ); 
    if (index !== -1) {
      let answer = this.answers.splice(index, 1)[0]; 
      player.score += answer.respondents;
      this.correctGuesses.push(answer);
      this.turnCounter++;
      return true;
    }
    this.turnCounter++;
    return false;
  }

  evaluateGuess(guess) {
    if (this.answers.forEach(answer => {
      answer.answer.toUpperCase().includes(guess.toUpperCase())
    })) {return true;
    } return false;
  }

  passPlayers() {
    return [this.player1, this.player2];
  }


}

export default Round 