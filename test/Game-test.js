import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Game from '../src/Game.js';
import data from '../src/data.js';
import domUpdates from '../src/domUpdates.js';

chai.spy.on(domUpdates, ['displayRound', 'displayQuestion', 'displayStartModal'], () => {});

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game(data.surveys, data.answers, 'Quinne', 'Scott');
  });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should have an array of surveys', () => {
    expect(game.surveys.length).to.equal(15);
  });

  it('should have an array of answers, 3 for each survey', () => {
    expect(game.answers.length).to.equal(45);
  });

  it('should be able to add 2 players', () => {
    game.addPlayers('Quinne', 'Scott');
    expect(game.players[1].name).to.equal('Scott');
  });

  it('should store used surveys', () => {
    game.selectSurvey();
    game.selectSurvey();
    expect(game.usedSurveys.length).to.equal(3);
  });

  it('should get the current survey answers', () => {
    game.getSurveyAnswers();
    expect(game.currentAnswers.length).to.eql(3);
  });
  
  it('should be able to start a new round', () => {
    game.startRound();
    expect(game.currentRound.roundCounter).to.equal(1);
    expect(domUpdates.displayQuestion).to.have.been.called(1);
    expect(domUpdates.displayRound).to.have.been.called(1);
    expect(domUpdates.displayStartModal).to.have.been.called(1);

  });

  it('should keep track of the current round', () => {
    game.startRound();
    game.startRound();
    expect(game.roundCounter).to.equal(2);
  });

});