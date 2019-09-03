import data from './data.js';
import Game from './Game.js'
import Player from './Player.js';
import domUpdates from './domUpdates.js';
// import FastMoney from './FastMoney.js';

class Round {
  constructor(survey, answers, players) {
    this.survey = survey;
    this.answers = answers;
    this.correctGuesses = [];
    this.players = players;
    this.currentPlayer;
    this.turnCounter = 1;
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
      // domUpdates.appendCorrectGuess(player.id, index, this.answers[index], player.score); 
      let answer = this.answers.slice(index)[0];
      this.correctGuesses.push(answer.answer.toUpperCase());
      this.turnCounter++;
      //update DOM Correct! + Points, reveal question on DOM
      return true;
    }
    this.turnCounter++;
    //update DOM WRONG!
    return false;
  }

  // evaluateGuess(guess) {
  //   this.ans
  // return this.answers.includes(answer => {
  //   return answer.answer.toUpperCase()=== guess.toUpperCase()
  // })
  // }

  endRound() {
    if (this.answers.length === 0) {
      // Update DOM (show current leader and points);
      //Button to move on
      //instatiate a new round
    }
  }


}

export default Round 