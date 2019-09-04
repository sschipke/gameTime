import chai from 'chai';
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
import Round from '../src/Round.js';
import domUpdates from '../src/domUpdates.js';

chai.spy.on(domUpdates, ['appendCorrectGuess', 'displayRoundModal', 'displayFastMoneyModal'], () =>{});

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
    round = new Round(survey, answers, players, 1);
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
    round.submitGuess('Want more space');
    expect(round.correctGuesses).to.eql(['WANT MORE SPACE']);
    expect(domUpdates.appendCorrectGuess).to.have.been.called(1);
    expect(round.players[0].score).to.equal(33);
    expect(round.turnCounter).to.equal(2);
  });
  it('should accurately evaluate an incorrect guess', () => {
    round.submitGuess('wrong')
    expect(round.correctGuesses.length).to.equal(0);
    expect(round.players[0].score).to.equal(0);
    expect(round.turnCounter).to.equal(2)
  });

  it('should should accurately evaluate multiple guesses', () => {
    round.submitGuess('want more space');
    round.submitGuess('wrong');
    round.submitGuess('Family has grown');
    expect(round.turnCounter).to.equal(4);
    expect(round.players[1].score).to.equal(0);
    expect(round.players[0].score).to.equal(94);
    expect(round.correctGuesses).to.eql(['WANT MORE SPACE','FAMILY HAS GROWN']);
    expect(round.correctGuesses.length).to.equal(2);
  });

  it('should be able to end a round', () => {
    round.submitGuess('want more space');
    round.submitGuess('family has grown');
    round.submitGuess('can afford more');
    expect(domUpdates.displayRoundModal).to.have.been.called(1)
  });
  it('should start a fast money round after two rounds', () => {
    round.roundCounter = 2;
    round.submitGuess('want more space');
    round.submitGuess('family has grown');
    round.submitGuess('can afford more');
    expect(domUpdates.displayFastMoneyModal).to.have.been.called(1)
  })

  //******* next method *****/

})