const expect = chai.expect;
import chai from 'chai';

import Game from '../src/Game.js';
import data from '../src/data.js';

// import Round from '../src/Round.js';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game(data.surveys, data.answers)
  })

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  })

  it('should be able to add 2 players', () => {
    game.addPlayers('Quinne', 'Scott');
    expect(game.players[1].name).to.equal('Scott')
  })

  it('should store used surveys', () => {
    game.selectSurvey();
    game.selectSurvey();
    expect(game.usedSurveys.length).to.equal(3);
  })

  it('should get the current survey answers', () => {
    game.getSurveyAnswers();
    expect(game.currentAnswers.length).to.eql(3);
  })

  // it('should be able to start a round', () => {
  //   game.startRound();
  //   expect(game.round.answers.length).to.equal(3)

  // })

  it('should keep track of the current round', () => {
    game.startRound();
    game.startRound();
    expect(game.roundCounter).to.equal(2)
  })

})