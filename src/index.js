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
  $('#submit-guess').prop('disabled', true);
  $('#game-page').hide();
  $('#player2-carrot').hide();
  // include all elements that should be hidded on page load, then we can show as/when needed


$('.name-inputs').keyup(() => {
  if ($('#player1-input').val() !== '' && $('#player2-input').val() !== '') {
    $('#start-game').prop('disabled', false);
  }
})

$('#start-game').click(() => {
  let player1 = $('#player1-input').val();
  let player2 = $('#player2-input').val();
  // fetch
  fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data')
  .then(response => response.json())
  .then(data =>  startGame(player1, player2, data.data.surveys, data.data.answers))
  .catch(err => console.log(err));
});

const startGame = (p1, p2, surveys, answers) => {
  game = new Game(surveys, answers);
  game.addPlayers(p1, p2);
  // domUpdates.appendPlayerNames(p1, p2);
  $('#splash-page').hide();
  $('#game-page').show();
  //hide round until button clicked
  game.startRound();
};

$('#guess-input').keyup(() => {
  if ($('#guess-input').val() !== '') {
      $('#submit-guess').prop('disabled', false);
    }
})

$('#submit-guess').click(() => {
  game.currentRound.submitGuess($('#guess-input').val())
  $('#guess-input').val('')
  $('#submit-guess').prop('disabled', true)
  $('#player2-carrot, #player1-carrot').toggle();
})

$('#game-page').click((e) => { 
  if(e.target.id === 'close-modal') {
    console.log('helloooooooo')
    $('#answer1').text('1');
    $('#score1').text('#');
    $('#answer2').text('2');
    $('#score2').text('#');
    $('#answer3').text('3');
    $('#score3').text('#');
    game.startRound();
    $('#round-modal').remove();
  }
  // console.log(this);
  // $('#close-modal').remove('#round-modal');
});

})