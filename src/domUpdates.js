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

displayRoundModal(round) {
$(`<div id="round-modal"><div id="modal-content"><p>Round: ${round}</p><p>Here is more content!</p><button id="close-modal" type="button">Close</button></div></div>`).insertAfter('#main-survey-guess')
},

displayFastMoneyModal(round) {
  $(`<div id="round-modal"><div id="modal-content"><p>Round: ${round}</p><p>Here is more content!</p><button id="close-modal" type="button">Close</button></div></div>`).insertAfter('#main-survey-guess')
},

};
