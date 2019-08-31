import chai from 'chai';
const expect = chai.expect
import Game from '../src/Game.js'
import Round from '../src/Round.js';

describe('Round', () => {
  let round
  beforeEach(() => {
    round = new Round()
  })
  it('should be a function', () => {
    expect(Round).to.be.a('function')
  });
  it('should be a instance of the Round class', () => {
    expect(round).to.be.an.instanceOf(Round)
  })
})