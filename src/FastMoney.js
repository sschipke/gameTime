import Round from './Round.js';
import domUpdates from './domUpdates.js'

let domUpdate = domUpdates;

class FastMoney extends Round {
  constructor(survey, answers, players, multiplier) {
    super(survey, answers, players);
    this.multiplier = multiplier || 1;
    this.player1Guesses = [];
    this.player2Guesses = [];
    this.player1Score = 0;
    this.player2Score = 0;
    this.timer = 30;
  }

  countdown(timerId) {
    elem.css('color', 'black')
    if (timeLeft == -1) {
        clearTimeout(timerId);
//         showFinalModal();
        elem.text('TIME: 30 SEC')
    } else if(timeLeft <= 5) {
      elem.css('color', '#F05355');
      elem.text(`TIME: ${timeLeft} SEC`);
      timeLeft--;
    } else {
      elem.text(`TIME: ${timeLeft} SEC`);
      timeLeft--;
    }
}

  startTimer() {
  timerId = setInterval(countdown, 1000);
  timeLeft = 30;
	elem = $('timer');
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