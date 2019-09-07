import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import FastMoney from '../src/FastMoney.js';
import Player from '../src/Player.js';
import domUpdates from '../src/domUpdates.js';
  
chai.spy.on(domUpdates, 'displayWinnerModal', () =>{});

describe('Fast Money', () => {

  let fastMoney, survey, answers, player1, player2, players;

  beforeEach(() => {
    player1 = new Player(1, 'Bob');
    player2 = new Player(2, 'Joe');
    player1.multiplier = 2;
    player2.multiplier = 3;
    player1.score = 10;
    player2.score = 20;
    players = [player1, player2]
    survey = { 
      id: 1, 
      question: 'If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?'
    };
    answers = [
      { answer: 'Beer', respondents: 67, surveyId: 1 }, 
      { answer: 'Bowling Ball', respondents: 5, surveyId: 1 }, 
      { answer: 'Donuts', respondents: 24, surveyId: 1 }];
    fastMoney = new FastMoney(survey, answers, players);
  });

  it('should be a function', () => {
    expect(FastMoney).to.be.a('function');
  });

  it('should have a survey, answers, and players', () => {
    expect(fastMoney.survey.id).equal(1);
    expect(fastMoney.answers[2].answer).to.equal('Donuts');
    expect(fastMoney.players[0].multiplier).to.equal(2);
  });

  it('should be able to log player guesses', () => {
    fastMoney.logGuesses('Beer');
    fastMoney.logGuesses('Donuts');
    fastMoney.turnCounter = 2;
    fastMoney.logGuesses('bowling ball');
    fastMoney.checkGuesses();
    expect(fastMoney.players[0].fmScore).to.equal(182);
    expect(fastMoney.players[1].fmScore).to.equal(15);
  });

  it('should be able to get final scores', () => {
    fastMoney.logGuesses('Beer');
    fastMoney.logGuesses('Donuts');
    fastMoney.turnCounter = 2;
    fastMoney.logGuesses('bowling ball');
    fastMoney.checkGuesses();
    fastMoney.getFinalScores();
    expect(fastMoney.players[0].score).to.equal(192);
    expect(fastMoney.players[1].score).to.equal(35);   
  });

  it('should be able to find the winner', () => {
    fastMoney.logGuesses('Beer');
    fastMoney.logGuesses('Donuts');
    fastMoney.turnCounter = 2;
    fastMoney.logGuesses('bowling ball');
    fastMoney.checkGuesses();
    fastMoney.getFinalScores();
    expect(fastMoney.findWinner()[0].name).to.equal('Bob');
  });

  it('should be able to end the game', () => {
    fastMoney.logGuesses('Beer');
    fastMoney.logGuesses('Donuts');
    fastMoney.turnCounter = 2;
    fastMoney.logGuesses('bowling ball');
    fastMoney.endGame();
    expect(domUpdates.displayWinnerModal).to.have.been.called(1);
  });

});