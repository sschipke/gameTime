import $ from 'jquery';

import './css/base.scss';

import './images/feud_title.png';
import './images/feud_subtitle.png';
import './images/feud_splash_bkgd.png';
import './images/feud_modal_bkgd.png';
import './images/feud_vs.png';
import './images/feud_icon.png';
import Game from './Game.js';
import domUpdates from './domUpdates';

let game, timer, timeLeft, timerId;

$(document).ready(() => {
  $('#start-game, #submit-guess').prop('disabled', true);
  $('#game-page, #player2-carrot').hide();

  $('.name-inputs').keyup(() => {
    if ($('#player1-input').val() !== '' && $('#player2-input').val() !== '') {
      $('#start-game').prop('disabled', false);
    }
  });

  $('#start-game').on('keypress click', (e) => {
    e.preventDefault();
    if (e.which === 13 || e.type === 'click') {
      let player1 = $('#player1-input').val();
      let player2 = $('#player2-input').val();
      fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data')
        .then(response => response.json())
        .then(data =>  startGame(data.data.surveys, data.data.answers, player1, player2))
        .catch(err => console.log(err));
      $('#guess-input').attr('placeholder', `${player1} enter a guess`)
    }
  });

  const startGame = (surveys, answers, p1, p2) => {
    game = new Game(surveys, answers, p1, p2);
    domUpdates.appendPlayerNames(p1, p2);
    $('#splash-page').hide();
    $('#game-page').show();
    game.startRound();
  };

  $('.help').click(showHelpModal);
  $('.endgame').click(showEndGameModal)

  $('#guess-input').keyup((e) => {
    if ($('#guess-input').val() !== '') {
      $('#submit-guess').prop('disabled', false);
    }
    if (e.keyCode === 13) {
      if (game.roundCounter <= 2) {
        game.currentRound.submitGuess($('#guess-input').val())
        $('#guess-input').val('')
        $('#submit-guess').prop('disabled', true)
        $('#aside-player2, #aside-player1').toggleClass('innactive')
        $('#player2-carrot, #player1-carrot').toggle(); setInputText();
      } else {
        let guess = $('#guess-input').val();
        $('#guess-input').val('');
        game.currentRound.logGuesses(guess)
        setInputText();
      }
    }
  });

  $('#submit-guess').on('keypress click', (e) => {
    e.preventDefault();
    if (e.which === 13 || e.type === 'click') {
      if (game.roundCounter <= 2) {
        game.currentRound.submitGuess($('#guess-input').val())
        $('#guess-input').val('')
        $('#submit-guess').prop('disabled', true)
        $('#aside-player2, #aside-player1').toggleClass('innactive')
        $('#player2-carrot, #player1-carrot').toggle(); 
        setInputText();
      } else {
        let guess = $('#guess-input').val();
        $('#guess-input').val('');
        setInputText();
        game.currentRound.logGuesses(guess)
      }
    }
  });

  $('#game-page').click((e) => {
    if (e.target.classList.contains('close-modal-round')) {
      $('#answer1').text('1');
      $('#answer2').text('2');
      $('#answer3').text('3');
      $('#score1, #score2, #score3').text('#');
      game.startRound();
      game.currentRound.turnCounter++;
      switchStartingPlayer();
      $('#round-modal').remove();
    }
    if (e.target.classList.contains('close-modal-start')) {
      $('#start-modal').remove();
    }
    if (e.target.classList.contains('return-game')) {
      $('#end-modal').remove();
    }
    if (e.target.classList.contains('close-model-help')) {
      $('#help-modal').remove();
    }
    if (e.target.classList.contains('new-game')) {
      $('#winner-modal').remove();
      window.location.reload();
    }
    if (e.target.classList.contains('close-modal-fast-money')) {
      $('#answer1').text('1');
      $('#answer2').text('2');
      $('#answer3').text('3');
      $('#score1, #score2, #score3').text('#');
      let p1Multi = e.target.closest('#fastmoney-modal').querySelector('#p1-multiplier').value;
      let p2Multi = e.target.closest('#fastmoney-modal').querySelector('#p2-multiplier').value;
      getMultipliers(p1Multi, p2Multi)
      game.startRound();
      $('#fastmoney-modal').remove();
      $('#aside-player1').removeClass('innactive');
      $('#aside-player2').addClass('innactive');
      $('#player1-carrot').show();
      $('#player2-carrot').hide();
      startTimer();
    }
    if (e.target.classList.contains('close-modal-fast-money2')) {
      startFastMoneyRound2();
    }
    if (e.target.classList.contains('end-modal')) {
      window.location.reload();
    }
  });

  const startFastMoneyRound2 = () => {
    $('#fastmoney-modal2').remove();
    switchStartingPlayer();
    setInputText();
    startTimer();
  };

  const switchStartingPlayer = () => {
    $('#aside-player2').removeClass('innactive');
    $('#aside-player1').addClass('innactive');
    $('#player1-carrot').hide();
    $('.round-modal').remove();
    $('#player2-carrot').show();
  };

  const startTimer = () => {
    timer = document.getElementById('timer');
    timeLeft = 30;
    timerId = setInterval(countdown, 1000);
  };

  const countdown = () => {
    timer.style.color = 'black';
    if (timeLeft == -1) {
      clearTimeout(timerId);
      countDOM()
      game.currentRound.turnCounter++
    } else if (timeLeft <= 5) {
      timer.style.color = '#F05355';
      timer.innerHTML = `TIME: ${timeLeft} SEC`;
      timeLeft--;
    } else {
      timer.innerHTML = `TIME: ${timeLeft} SEC`;
      timeLeft--;
    }
  };

  const countDOM = () => {
    if (game.currentRound.turnCounter === 1) {
      $('#submit-guess').prop('disabled', true);
      domUpdates.displayFastMoneyModal2('FAST MONEY', game.players[1].name);
      timer.innerHTML = 'TIME: 30 SEC';
    }
    if (game.currentRound.turnCounter === 2) {
      $('#submit-guess').prop('disabled', true);
      game.currentRound.endGame();
    }
  };

  const setInputText = () => {
    if (game.currentRound.determineCurrentPlayer().id === 1) {
      $('#guess-input').attr('placeholder', `${game.players[0].name} enter your guess`)
    } else {
      $('#guess-input').attr('placeholder', `${game.players[1].name} enter your guess`)
    }
  }

  function showHelpModal() {
    $(`<div id="help-modal" class="modal-structure">
        <div class="modal-content">
          <h6>THE RULES</h6>
          <ul>
            <li>Each player will alternate guessing the top 3 reponses to a question.</li>
            <li>When a correct guess is made, that player's score will increase by the number of responses.</li>
            <li>The round will end after all three responses have been guessed.</li>
            <li>After 2 rounds you will play a FAST MONEY Round!</li>
          </ul>
          <button class="close-model-help" type="button">close</button>
        </div>
      </div>`).insertAfter('#main-survey-guess')
  }

  function showEndGameModal() {
    $(`<div id="end-modal" class="modal-structure">
        <div class="modal-content">
          <h6>WAIT!!!</h6>
          <ul>
            <li>Are you sure you want quit??</li>
            <li>Once you click the button below, you will lose all your progress!</li>
          </ul>
          <div class="endgame-buttons">
            <button class="end-modal">end game</button>
            <button class="return-game">return to game</button>
          </div>
        </div>
      </div>`).insertAfter('#main-survey-guess')
  }

  const getMultipliers = (p1, p2) => {
    game.players[0].multiplier = p1;
    game.players[1].multiplier = p2;
  };

});
