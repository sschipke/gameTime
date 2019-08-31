import chai from 'chai';
import data from '../src/data.js';

const expect = chai.expect
import Game from '../src/Game.js'
import Round from '../src/Round.js';
import Player from '../src/Player.js';
import FastMoney from '../src/FastMoney.js';

describe('Round', () => {
  let round
  beforeEach(() => {
    const survey = { id: 4, question: 'Why Might A Family Move Into A Bigger House?' };
    let answers = [
      { answer: 'Family Has Grown', respondents: 61, surveyId: 4 },
      { answer: 'Want More Space', respondents: 33, surveyId: 4 },
      { answer: 'Can Afford More', respondents: 5, surveyId: 4 }
    ];
    let players = [{id: 1, name: 'Becky', score: 0}, {id: 2, name: 'Jhun', score: 0}];
    round = new Round(survey, answers, players);
  })
  it('should be a function', () => {
    expect(Round).to.be.a('function')
  });
  it('should be a instance of the Round class', () => {
    expect(round).to.be.an.instanceOf(Round)
  });
  it('should be able to determine the current player', () => {
    expect(round.determineCurrentPlayer()).to.eql(round.player1);
    round.turnCounter++;
    expect(round.determineCurrentPlayer()).to.eql(round.player2);
    round.turnCounter++;
    expect(round.determineCurrentPlayer()).to.equal(round.player1)
  });
  
})