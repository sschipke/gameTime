import chai from 'chai';
const expect = chai.expect;

import FastMoney from '../src/FastMoney';

describe('Fast Money', () => {

  let fastMoney;

  beforeEach(() => {
    fastMoney = new FastMoney(1);
  });

  it('should be an instance of Fast Money', () => {
    expect(fastMoney).to.be.an.instanceOf(FastMoney);
  });

  it('should have access to Round\'s properties', () => {
    expect(fastMoney.correctGuesses).to.deep.equal([]);
  });

  it('should have a timer', () => {
    expect(fastMoney.startTimer()).to.equal();
  })

});