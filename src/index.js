import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/feud_title.png'
import './images/feud_subtitle.png'
import './images/feud_splash_bkgd.png'
import './images/feud_vs.png'

import data from './data.js';

import Game from './Game.js';
import domUpdates from './domUpdates';


let game, player1, player2;

$('#start-game').click(e => {
  player1 = $('#player1-input').val();
  player2 = $('#player2-input').val();
  // fetch
  startGame();
});

const startGame = () => {
  game = new Game(data.surveys, data.answers);
  game.addPlayers(player1, player2);
  game.startRound();

};

console.log('This is the JavaScript entry file - your code begins here.');
