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

  it('should be an instance of Player', () => {
    expect(player).to.be.an.instanceof(Player);
  });

  it('should have an id', () => {
    expect(player.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(player.name).to.equal('Quinne');
  });

  it('should have a score', () => {
    expect(player.score).to.equal(0);
  });

});
