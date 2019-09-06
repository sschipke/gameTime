import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/feud_title.png';
import './images/feud_subtitle.png';
import './images/feud_splash_bkgd.png';
import './images/feud_modal_bkgd.png';
import './images/feud_vs.png';

import data from './data.js';

import Game from './Game.js';
import domUpdates from './domUpdates';


let game, timer, timeLeft, timerId;

$(document).ready(() => {
  $('#start-game, #submit-guess').prop('disabled', true);
  $('#game-page, #player2-carrot, #start-modal').hide();
  // include all elements that should be hidded on page load, then we can show as/when needed

$('.name-inputs').keyup(() => {
  if ($('#player1-input').val() !== '' && $('#player2-input').val() !== '') {
    $('#start-game').prop('disabled', false);
  }
})

$('#start-game').click(() => {
  let player1 = $('#player1-input').val();
  let player2 = $('#player2-input').val();
  fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data')
  .then(response => response.json())
  .then(data =>  startGame(player1, player2, data.data.surveys, data.data.answers))
  .catch(err => console.log(err));
});

const startGame = (p1, p2, surveys, answers) => {
  game = new Game(surveys, answers);
  game.addPlayers(p1, p2);
  domUpdates.appendPlayerNames(p1, p2);
  $('#splash-page').hide();
  $('#game-page').show();
  game.startRound();
};

$('#guess-input').keyup(() => {
  if ($('#guess-input').val() !== '') {
      $('#submit-guess').prop('disabled', false);
    }
})

$('#submit-guess').click(() => {
    if (game.roundCounter <= 2) {
      game.currentRound.submitGuess($('#guess-input').val())
      $('#guess-input').val('')
      $('#submit-guess').prop('disabled', true)
      $('#aside-player2, #aside-player1').toggleClass('innactive')
      $('#player2-carrot, #player1-carrot').toggle();
    } else {
      let guess = $('#guess-input').val();
      $('#guess-input').val('');
      game.currentRound.logGuesses(game.currentRound.turnCounter, guess)
    }
})

$('#game-page').click((e) => {
  if(e.target.classList.contains('close-modal')) {
    $('#answer1').text('1');
    $('#answer2').text('2');
    $('#answer3').text('3');
    $('#score1', '#score2', '#score3').text('#');
    game.startRound();
    $('.round-modal').remove();
  }
  if(e.target.classList.contains('close-modal-start')) {
    $('.round-modal').remove();
  }
});

$('#game-page').click((e) => {
  if(e.target.classList.contains('close-modal-fast-money')) {
    $('#answer1').text('1');
    $('#answer2').text('2');
    $('#answer3').text('3');
    $('#score1', '#score2', '#score3').text('#');
    let p1Multi = e.target.closest('#multi-inputs').querySelector('#p1-multi').value;
    let p2Multi = e.target.closest('#multi-inputs').querySelector('#p2-multi').value;
    getMultipliers(p1Multi, p2Multi)
    game.startRound();
    $('.round-modal').remove();
    startTimer();
  }
  if(e.target.classList.contains('close-modal-start')) {
    $('.round-modal').remove();
  }
});

function startTimer() {
	timer = document.getElementById('timer');
  timeLeft = 30;
  timerId = setInterval(countdown, 1000);
};

function countdown() {
  timer.style.color = 'black';
  if (timeLeft == -1) {
    clearTimeout(timerId);
    // prompt player two
    // restart timer
    // enable button
    $('#submit-guess').prop('disabled', true);
    game.currentRound.roundCounter++;
//  showFinalModal();
    timer.innerHTML = 'TIME: 30 SEC'
  } else if(timeLeft <= 5) {
    timer.style.color = '#F05355';
    timer.innerHTML = `TIME: ${timeLeft} SEC`;
    timeLeft--;
  } else {
    timer.innerHTML = `TIME: ${timeLeft} SEC`;
    timeLeft--;
  }
};

const getMultipliers = (p1, p2) => {
  game.players[0].multiplier = p1;
  game.players[1].multiplier = p2;
}

});
