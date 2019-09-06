import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import FastMoney from '../src/FastMoney.js';
import Round from '../src/Round.js';
import Player from '../src/Player.js';

import domUpdates from '../src/domUpdates.js';
  
chai.spy.on(domUpdates, 'displayWinnerModal', () =>{});

describe('Fast Money', () => {

  let fastMoney, surveys, answers, players;

  beforeEach(() => {
    surveys = [{ id: 1, question: 'If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?' }];

    answers = [{ answer: 'Beer', respondents: 67, surveyId: 1 }, { answer: 'Bowling Ball', respondents: 5, surveyId: 1 }, { answer: 'Donuts', respondents: 24, surveyId: 1 }];

    players = [{ id : 1, name: 'Bob', score: 0, multiplier: 2, fmGuesses: [], fmScore: 0 }, { id : 2, name: 'Joe', score: 0, multiplier: 3, fmGuesses: [], fmScore: 0 }];

    fastMoney = new FastMoney(surveys, answers, players, 1);
  });

  it('should be an instance of Fast Money', () => {
    expect(fastMoney).to.be.an.instanceOf(FastMoney);
  });

  it('should have access to Round\'s properties', () => {
    expect(fastMoney.correctGuesses).to.deep.equal([]);
  });

  it('should be able to log user guesses', () => {
    fastMoney.logGuesses(1, 'Beer');
    fastMoney.logGuesses(1, 'Donuts');
    fastMoney.logGuesses(2, 'Bowling Ball');
    let here = fastMoney.checkGuesses();
    // console.log(here)
    expect(fastMoney.players[0].fmScore).to.equal(182);
  });

  it('should be able to end the game', () => {

  });

  // need to add more tests and chai spies
});