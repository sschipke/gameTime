import Round from '../src/Round.js';

class FastMoney extends Round {
  constructor(survey, answers, players, multiplier) {
    super(survey, answers, players);
    this.timer = 30000;
    this.multiplier = multiplier || 1;
    this.player1Guesses = [];
    this.player2Guesses = [];
    this.player1Score = 0;
    this.player2Score = 0;
  }

  startTimer() {
    // console.log('TIME START');
    // this.setTimeout(() => {
      // console.log('TIMES UP'), this.timer;
    // });
  }

  logGuesses(playerID, guess) {
    playerID === 1 ? this.player1Guesses.push(guess) : this.player2Guesses.push(guess);
  }

  compareGuesses(playerID) {
    if(playerID === 1) {
      return this.answers.filter(answer => this.player1Guesses.includes(answer.answer)).forEach((response) => this.player1Score += response.respondents) * this.multiplier;
    } else {
      return this.answers.filter(answer => this.player2Guesses.includes(answer.answer)).forEach((response) => this.player2Score += response.respondents) * this.multiplier;
    }
  }
}

export default FastMoney;