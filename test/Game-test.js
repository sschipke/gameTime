import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Game from '../src/Game.js';
import data from '../src/data.js';
import domUpdates from '../src/domUpdates.js';

chai.spy.on(domUpdates, ['displayRound', 'displayQuestion'], () => {});

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
    expect(game.players[1].name).to.equal('Scott');
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
    expect(game.roundCounter).to.equal(2);
    expect(domUpdates.displayQuestion).to.have.been.called(2);
    expect(domUpdates.displayRound).to.have.been.called(2);
  })

})