import $ from 'jquery';
import Round from './Round';

export default {

appendPlayerNames(p1, p2) {
    $('#player1-name').text(p1);
    $('#player2-name').text(p2);
},

appendCorrectGuess(id, index, answer, score) {
  $(`#answer${index + 1}`).text(answers[index].answer);
  $(`#score${index + 1}`).text(answers[index].respondents);
  $(`#player${id}-score`).text(score);
},

displayQuestion(question) {
    $('h1').text(question);
},

};

