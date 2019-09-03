import $ from 'jquery';
import Round from './Round';

export default {

appendPlayerNames(p1, p2) {
  $('#h5-fe').text(p1);
  $('#h5-be').text(p2);
},

displayQuestion(question) {
  $('h1').text(question);
},

updateScore(player) {
  let fe = '#h4-fe';
  let be = '#h4-be';
  let container = player.id === 1 ? fe : be
  $(`${container}`).text(player.score)
}

};