const expect = chai.expect;
import chai from 'chai';

import Game from '../src/Game.js';
import data from '../src/data.js'

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game(data.surveys, data.answers)
  })

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  })

  it('should be able to add 2 players', () => {
    game.addPlayers('Quinne', 'Scott');
    expect(game.players[1].name).to.equal('Scott')
  })



})