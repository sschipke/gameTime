import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/feud_title.png';
import './images/feud_subtitle.png';
import './images/feud_splash_bkgd.png';
import './images/feud_modal_bkgd.png';
import './images/feud_vs.png';
import './images/feud_icon.png'
import Game from './Game.js';
import domUpdates from './domUpdates';


let game, timer, timeLeft, timerId;

$(document).ready(() => {
  let $guessInput = $('#guess-input');
  $('#start-game, #submit-guess').prop('disabled', true);
  $('#game-page, #player2-carrot, #start-modal').hide();
  // include all elements that should be hidded on page load, then we can show as/when needed

$('.name-inputs').keyup(() => {
  if ($('#player1-input').val() !== '' && $('#player2-input').val() !== '') {
    $('#start-game').prop('disabled', false);
  }
})

$('#start-game').on('keypress click', (e) => {
  e.preventDefault();
  if (e.which === 13 || e.type === 'click') {
  let player1 = $('#player1-input').val();
  let player2 = $('#player2-input').val();
  fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data')
  .then(response => response.json())
  .then(data =>  startGame(data.data.surveys, data.data.answers, player1, player2))
  .catch(err => console.log(err));
  }
});

const startGame = (surveys, answers, p1, p2) => {
  game = new Game(surveys, answers, p1, p2);
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

// we can tab to buttons to submit on enter, but still need to be able to submit on enter from input field

$('#submit-guess').on('keypress click', (e) => {
  // all we need is to add an event listener to the input and make sure enter is hit, we may neee to put the below into a handler if (e.keycode === 13) {functions}
  e.preventDefault();
  if (e.which === 13 || e.type === 'click') {
    if (game.roundCounter <= 2) {
      game.currentRound.submitGuess($('#guess-input').val())
      $('#guess-input').val('')
      $('#submit-guess').prop('disabled', true)
      $('#aside-player2, #aside-player1').toggleClass('innactive')
      $('#player2-carrot, #player1-carrot').toggle();
    } else {
      let guess = $('#guess-input').val();
      $('#guess-input').val('');
      game.currentRound.logGuesses(guess)
    }
  }
})

$('.help').click(showHelpModal);
$('.endgame').click(showEndGameModal)

$('#game-page').click((e) => {
  if(e.target.classList.contains('start-round')) {
    $('#answer1').text('1');
    $('#answer2').text('2');
    $('#answer3').text('3');
    $('#score1, #score2, #score3').text('#');
    game.startRound();
    game.currentRound.turnCounter++;
    switchStartingPlayer();
    $('.round-modal').remove();
  }
  if(e.target.classList.contains('close-modal-start')) {
    $('.round-modal').remove();
  }
  if(e.target.classList.contains('return-game')) {
    $('#end-modal').remove();
  }
  if(e.target.classList.contains('new-game')) {
    $('#winner-modal').remove();
    window.location.reload();
  }
});

$('#game-page').click((e) => {
  if(e.target.classList.contains('fast-money-start')) {
    $('#answer1').text('1');
    $('#answer2').text('2');
    $('#answer3').text('3');
    $('#score1, #score2, #score3').text('#');
    let p1Multi = e.target.closest('#fastmoney-modal').querySelector('#p1-multiplier').value;
    let p2Multi = e.target.closest('#fastmoney-modal').querySelector('#p2-multiplier').value;
    getMultipliers(p1Multi, p2Multi)
    game.startRound();
    $('.round-modal').remove();
    startTimer();
  }
  if(e.target.classList.contains('close-modal-start')) {
    $('.round-modal').remove();
  }
  if (e.target.classList.contains('end-modal')) {
    window.location.reload();
  }
  if(e.target.classList.contains('close-modal-fast-money2')) {
    startFastMoneyRound2();
  }
});

function startFastMoneyRound2() {
  $('#fastmoney-modal').remove();
  switchStartingPlayer();
  $('#player1-carrot').toggle();
  $('#player2-carrot').toggle();
  startTimer();
}

function switchStartingPlayer() {
  $('#aside-player2').removeClass('innactive');
  $('#aside-player1').addClass('innactive');
  $('#player1-carrot').hide();
  $('.round-modal').remove();
  $('#player2-carrot').show();
}

function startTimer() {
	timer = document.getElementById('timer');
  timeLeft = 30;
  timerId = setInterval(countdown, 1000);
};

function countdown() {
  timer.style.color = 'black';
  if (timeLeft == -1) {
    clearTimeout(timerId);
    countDOM()
    game.currentRound.turnCounter++
  } else if(timeLeft <= 5) {
    timer.style.color = '#F05355';
    timer.innerHTML = `TIME: ${timeLeft} SEC`;
    timeLeft--;
  } else {
    timer.innerHTML = `TIME: ${timeLeft} SEC`;
    timeLeft--;
  }
};

function countDOM() {
  console.log(game.currentRound.turnCounter)
  if (game.currentRound.turnCounter === 1) {
    $('#submit-guess').prop('disabled', true);
    domUpdates.displayFastMoneyModal2('FAST MONEY');
    timer.innerHTML = 'TIME: 30 SEC'
  }
  if (game.currentRound.turnCounter === 2) {
  $('#submit-guess').prop('disabled', true);
  game.currentRound.endGame()
  }
}

  function showHelpModal() {
    $(`<div id="help-modal" class="round-modal">
  <div id="help-modal-content" class="modal-content">
  <ul>
  <li class="modal-text">Each player will alternate guessing the top 3 reponses to a question.</li>

  <li class="modal-text">When a correct guess is made, that player's score will increase by the number of responses.</li>

  <li class="modal-text">The round will end after all three responses have been guessed.</li>

  <li class="modal-text">After 2 rounds you will play a FAST MONEY Round!</li>
  </ul>

  </p><button class="close-modal-start" type="button">Close</button>

  </div>
  </div>`).insertAfter('#main-survey-guess')
  }

  function showEndGameModal() {
    $(`<div id="end-modal" class="round-modal">
  <div id="end-modal-content" class="modal-content">
    <h2 class="end-warning">WAIT!!!</h2>
  <ul>

  <li class="modal-text">Are you sure you want quit??</li>

  <li class="modal-text">Once you click the button below, you will lose all your progress</li>

  </ul>
    <div class="endgame-buttons">
      <button class="end-modal">End Game!!</button> <button class="return-game"> Return to Game </button>
    </div>
  </div>
  </div>`).insertAfter('#main-survey-guess')
  }

const getMultipliers = (p1, p2) => {
  game.players[0].multiplier = p1;
  game.players[1].multiplier = p2;
}

});
