import Round from './Round.js';
import domUpdates from './domUpdates.js';

class FastMoney extends Round {
  constructor(survey, answers, players) {
    super(survey, answers, players);
    console.log(this.players)
  }

  logGuesses(playerID, guess) {
    playerID === 1 ? this.players[0].fmGuesses.push(guess.toUpperCase()) : this.players[1].fmGuesses.push(guess.toUpperCase());
    console.log('guesses', this.players)
  }

  checkGuesses() {
    this.players = this.players.map(player => {
      this.answers.filter(answer => player.fmGuesses.includes(answer.answer.toUpperCase())).forEach((response) => player.fmScore += (response.respondents * player.multiplier));
      return player;
    });
  }

  getFinalScores() {
    this.players = this.players.map(player => {
      if (player.fmScore === 0) {
        player.score -= player.multiplier * player.fmGuesses.length;
        return player
      } else {
        player.score += player.fmScore;
        return player;
      }
    });
  }

  findWinner() {
    return this.players.sort((a, b) => b.score - a.score);
  }

  endGame() {
    this.checkGuesses();
    this.getFinalScores();
    let winner = this.findWinner()[0];
    let loser = this.findWinner()[1];
    domUpdates.displayWinnerModal(winner, loser);
  }
}

export default FastMoney;
