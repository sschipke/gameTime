import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/feud_title.png';
import './images/feud_subtitle.png';
import './images/feud_splash_bkgd.png';
import './images/feud_vs.png';

import data from './data.js';

import Game from './Game.js';
import domUpdates from './domUpdates';


let game;

$(document).ready(() => {
  $('#start-game').prop('disabled', true);
  $('#game-page').hide();
  // include all elements that should be hidded on page load, then we can show as/when needed
})

$('.name-inputs').keyup(function() {
  if (
    $('#player1-input').val() !== '' && $('#player2-input').val() !== ''
    ) {
    $('#start-game').prop('disabled', false);
  }
})

$('#start-game').click(e => {
  let player1 = $('#player1-input').val();
  let player2 = $('#player2-input').val();
  // fetch
  startGame(player1, player2);
});

const startGame = (p1, p2) => {
  game = new Game(data.surveys, data.answers);
  game.addPlayers(p1, p2);
  // domUpdates.appendPlayerNames(p1, p2);
  $('#splash-page').hide();
  $('#game-page').show();
  game.startRound();
};

$('button').on('click', game.currentRound.submitGuess($('guess-input').val()))

