import $ from 'jquery';
import Round from './Round';

export default {

appendPlayerNames(p1, p2) {
    $('#player1-name').text(p1);
    $('#player2-name').text(p2);
},

appendCorrectGuess(id, index, answer, score) {
  $(`#answer${index + 1}`).text(answer.answer);
  $(`#score${index + 1}`).text(answer.respondents);
  $(`#player${id}-score`).text(score);
},

displayQuestion(question) {
    $('h1').text(question);
},

displayRound(count) {
  count <= 2 ? $("#round-counter").text(count) : $("#round-counter").text("FAST MONEY")
},

displayStartModal(round) {
  $(`<div id="start-modal" class="round-modal">
  <div id="start-modal-content" class="modal-content">
  <p class="modal-round">Ready to fued?</p>
  <p class="modal-round">ROUND: ${round}</p>
  <p class="modal-text">Each player will alternate guessing the top 3 reponses to a question.

  When a correct guess is made, that player's score will increase by the number of responses.

  The round will end after all three responses have been guessed.

  After 2 rounds you will play a FAST MONEY Round!

  Player 1 get ready!

  </p><button class="close-modal-start" type="button">LET'S FUED!!!</button>

  </div>
  </div>`).insertAfter('#main-survey-guess')
},

displayRoundModal(round) {
  $(`<div class="round-modal"><div class="modal-content"><p id="modal-round" class="modal-text">ROUND: ${round}</p><p class="modal-text">Here is more content!</p><button class="close-modal" type="button">Start</button></div></div>`).insertAfter('#main-survey-guess')
},

displayFastMoneyModal(round) {
  $(`<div id="fastmoney-modal" class="round-modal"><div class="modal-content"><p class="modal-round">ROUND: ${round}</p><p class="modal-text">Here is more content!</p><button class="close-modal" type="button">Start</button></div></div>`).insertAfter('#main-survey-guess')
},

};
