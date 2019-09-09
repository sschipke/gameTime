import domUpdates from './domUpdates.js';

class Round {
  constructor(survey, answers, players, round) {
    this.survey = survey;
    this.answers = answers;
    this.players = players;
    this.turnCounter = 1;
    this.currentPlayer;
    this.roundCounter = round;
    this.correctGuesses = [];
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
      domUpdates.correctGuessIndicator();
      this.turnCounter++;
      this.endRound();
    } else {
      domUpdates.incorrectGuessIndicator();
      this.turnCounter++;
    }
  }

  endRound() {
    if (this.correctGuesses.length === 3) {
      this.roundCounter <= 1 ? domUpdates.displayRoundModal(this.roundCounter + 1, this.players[1].name) : domUpdates.displayFastMoneyModal('FAST MONEY', this.players[0].name, this.players[1].name );
    }
  }
}

export default Round;
