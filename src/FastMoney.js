import Round from '../src/Round.js';

class FastMoney extends Round {
  constructor(multiplier) {
    super();
    this.timer = 30000;
    this.multiplier = multiplier;
    this.player1Guesses = [];
    this.plauer2Guesses = [];
  }

  startTimer() {
    console.log('TIME START');
    this.setTimeout(() => {
      console.log('TIMES UP'), this.timer;
    });
  }
}

export default FastMoney;