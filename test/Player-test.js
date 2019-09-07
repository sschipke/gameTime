const expect = chai.expect;
import chai from 'chai';

import Player from '../src/Player.js';

describe('Player', () => {

  let player;

  beforeEach(() => {
    player = new Player(1, 'Quinne');
  });

  it('should be a function', () => {
    expect(Player).to.be.a('function');
  });

  it('should have an id', () => {
    expect(player.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(player.name).to.equal('Quinne');
  });

  it('should have a score of 0 by default', () => {
    expect(player.score).to.equal(0);
  });

  it('should have a multiplier of 1 by default', () => {
    expect(player.multiplier).to.equal(1);
  });

  it('should have an empty array for fmGuesses by default', () => {
    expect(player.fmGuesses).to.eql([]);
  });

  it('should have a fmScore of 0 by default', () => {
    expect(player.fmScore).to.equal(0);
  });

});
