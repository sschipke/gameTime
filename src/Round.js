import data from './data.js';
import Game from './Game.js'
import Player from './Player.js';
// import FastMoney from './FastMoney.js';

class Round {
  constructor(survey, answers, players) {
    this.survey = survey;
    this.answers = answers.sort((answerA, answerB) => answerB.respondents - answerA.respondents);
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
    if (index !== -1) {
      let answer = this.answers.splice(index, 1)[0]; 
      player.score += answer.respondents;
      this.correctGuesses.push(answer);
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