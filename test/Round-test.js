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
    expect(round.determineCurrentPlayer()).to.eql(round.players[0]);
    round.turnCounter++;
    expect(round.determineCurrentPlayer()).to.eql(round.players[1]);
    round.turnCounter++;
    expect(round.determineCurrentPlayer()).to.equal(round.players[0])
  });
  it('should accurately evalutate a correct guess', () => {
    expect(round.submitGuess('Want more space')).to.equal(true);
    expect(round.correctGuesses).to.eql([{ answer: 'Want More Space', respondents: 33, surveyId: 4 }]);
    expect(round.players[0].score).to.equal(33);
    expect(round.turnCounter).to.equal(2);
  });
  it('should accurately evaluate an incorrect guess', () => {
    expect(round.submitGuess('wrong')).to.equal(false);
    expect(round.correctGuesses.length).to.equal(0);
    expect(round.players[0].score).to.equal(0);
    expect(round.turnCounter).to.equal(2)
  });
  it('should should accurately evaluate multiple guesses', () => {
    round.submitGuess('wrong');
    round.submitGuess('Family has grown');
    expect(round.turnCounter).to.equal(3);
    expect(round.players[0].score).to.equal(0);
    expect(round.players[1].score).to.equal(61);
    expect(round.correctGuesses).to.eql([{ answer: 'Family Has Grown', respondents: 61, surveyId: 4 }]);
    expect(round.answers.length).to.equal(2);
  });

  // it('should evaluate a guess', () => {
  //   console.log(round.evaluateGuess('Want more space'))
  //   expect(round.evaluateGuess('Family has grown')).to.equal(true);
  // })

  //******* next method *****/

})