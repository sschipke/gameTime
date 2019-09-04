import Round from './Round.js';

class FastMoney extends Round {
  constructor(survey, answers, players, multiplier) {
    super(survey, answers, players);
    this.multiplier = multiplier || 1;
    this.player1Guesses = [];
    this.player2Guesses = [];
    this.player1Score = 0;
    this.player2Score = 0;
  }

  startTimer() {
    domUpdate.changeTimerColor();
    let timer = 30;
    let elem = document.getElementById('timer');
    let timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timer == -1) {
        clearTimeout(timerId);
          // domUpdate.finalModal();
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
     }
}

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