import data from './data.js';
import Game from './Game.js'
import Player from './Player.js';
import domUpdates from './domUpdates.js';

class Round {
  constructor(survey, answers, players, round) {
    this.survey = survey;
    this.answers = answers;
    this.correctGuesses = [];
    this.players = players;
    // console.log(this.players)
    this.currentPlayer;
    this.turnCounter = 1;
    this.roundCounter = round;
  }

  determineCurrentPlayer() {
    if (this.turnCounter % 2 === 0) {
      this.currentPlayer = this.players[1];
      return this.players[1];
    } else {
      this.currentPlayer = this.players[0];
      return this.players[0];
    }
  }

  submitGuess(guess) {
    let player = this.determineCurrentPlayer();
    let index = this.answers.findIndex(answerObj =>
      answerObj.answer.toUpperCase() === guess.toUpperCase()
    );
    if (index !== -1 && !this.correctGuesses.includes(guess.toUpperCase())) {
      player.score += this.answers[index].respondents;
      domUpdates.appendCorrectGuess(player.id, index, this.answers[index], player.score);
      let answer = this.answers.slice(index)[0];
      this.correctGuesses.push(answer.answer.toUpperCase());
      this.turnCounter++;
      this.endRound();
      //update DOM RIGHT!
    } else {
      this.turnCounter++;
      //update DOM WRONG!
    }
  }

  endRound() {
    if (this.correctGuesses.length === 3) {
      this.roundCounter <= 1 ? domUpdates.displayRoundModal(this.roundCounter + 1) : domUpdates.displayFastMoneyModal('FAST MONEY');
    }
  }
}

export default Round;
