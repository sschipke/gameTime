import data from './data.js';
import Game from '../src/Game.js'
import Player from './Player.js';
import Round from './Round.js';
import FastMoney from './FastMoney.js';

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
    let index = this.answers.findIndex(answerObj => {
      answerObj.answer.toUpperCase() === guess.toUpperCase()
    }); 
    if (index !== -1) {
      let answer = this.answers.splice(index, 1).flat();
    }
    this.turnCounter++;
  }

}

export default Round 