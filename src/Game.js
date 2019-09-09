import Player from './Player.js';
import Round from './Round.js';
import FastMoney from './FastMoney.js';
import domUpdates from './domUpdates.js';

class Game {
  constructor(surveys, answers, p1, p2) {
    this.surveys = surveys;
    this.answers = answers;
    this.players = this.addPlayers(p1, p2);
    this.roundCounter = 0;
    this.currentSurvey;
    this.currentAnswers;
    this.usedSurveys = [0];
    this.currentRound;
  }

  addPlayers(p1, p2) {
    let player1 = new Player(1, p1);
    let player2 = new Player(2, p2);
    return [player1, player2];
  }

  selectSurvey() {
    let randomNum = Math.round(Math.random() * this.surveys.length);
    if (this.usedSurveys.includes(randomNum)) {
      this.selectSurvey();
    } else {
      this.currentSurvey = this.surveys.find(survey => survey.id === randomNum);
      this.usedSurveys.push(randomNum);
    }
  }

  getSurveyAnswers() {
    this.selectSurvey();
    console.log(this.currentAnswers)
    this.currentAnswers = this.answers.filter(answer => answer.surveyId === this.currentSurvey.id);
    this.currentAnswers.sort((a, b) => b.respondents - a.respondents);
  }

  startRound() {
    this.getSurveyAnswers();
    this.roundCounter++;
    if (this.roundCounter <= 1) {
      this.currentRound = new Round(this.currentSurvey, this.currentAnswers, this.players, this.roundCounter);
      domUpdates.displayStartModal(this.players[0].name);
    } else if (this.roundCounter <= 2) {
      this.currentRound = new Round(this.currentSurvey, this.currentAnswers, this.players, this.roundCounter);
    } else {
      this.currentRound = new FastMoney(this.currentSurvey, this.currentAnswers, this.players, this.roundCounter);
    }
    domUpdates.displayRound(this.roundCounter);
    domUpdates.displayQuestion(this.currentSurvey.question);
  }

}

export default Game;
