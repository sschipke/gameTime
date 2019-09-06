import $ from 'jquery';

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
  let roundText = count <= 2 ? count : "FAST MONEY";
  $('#round-counter').text(roundText);
},

displayStartModal(round) {
  $(`<div id="start-modal" class="round-modal">
  <div id="start-modal-content" class="modal-content">
  <p class="modal-round">Ready to feud?</p>
  <p class="modal-round">ROUND: ${round}</p>
  <ul>
  <li class="modal-text">Each player will alternate guessing the top 3 reponses to a question.</li>

  <li class="modal-text">When a correct guess is made, that player's score will increase by the number of responses.</li>

  <li class="modal-text">The round will end after all three responses have been guessed.</li>

  <li class="modal-text">After 2 rounds you will play a FAST MONEY Round!</li>
  </ul>
  <p>Player 1 get ready!</p>

  </p><button class="close-modal-start" type="button">LET'S FUED!!!</button>

  </div>
  </div>`).insertAfter('#main-survey-guess')
},

displayRoundModal(round) {
  $(`<div class="round-modal"><div class="modal-content"><p id="modal-round" class="modal-text">ROUND: ${round}</p><p class="modal-text">Here is more content!</p><button class="close-modal" type="button">Start</button></div></div>`).insertAfter('#main-survey-guess')
},

displayFastMoneyModal(round) {
  $(`<div id="fastmoney-modal" class="round-modal"><div class="modal-content">
    <p class="modal-round">Time to think fast!</p>
    <p class="modal-round">ROUND: ${round}</p>
    <ul>
    <li>Each player will have 30 seconds to guess as many responses as they can.</li>
    <li>Before starting each player will choose a multiplier between 1 and 5.</li>
    <li>After each player has had a turn, their scores will be increased by their correct responses total multiplied by their chosen multiplier.</li>
    <li>If a player does not make any correct guesses, their score will be decreased by their number of guesses multiplied by their chosen multiplier. </li>
    </ul>
    <div id="multi-inputs">
   <label for="p1-multi">Player 1 Multiplier</label>
   <input id="p1-multi" class="multipliers" type="number" placeholder="Enter Number 1 - 5">
   <label for="p2-multi">Player 2 Multiplier</label>
   <input id="p2-multi" class="multipliers" type="number" placeholder="Enter Number 1 - 5">
    <p>*Be Ready! Timer will start when button is clicked*</p>
    <button class="close-modal close-modal-fast-money" type="button">Start FAST MONEY Round</button></div></div></div>`).insertAfter('#main-survey-guess')
},

// displayFastMoneyModal(round) {
//   $(`<div id="fastmoney-modal" class="round-modal"><div class="modal-content">
//     <p class="modal-round">Time to think fast!</p>
//     <p class="modal-round">ROUND: ${round}</p>
//     <ul>
//     <li>Each player will have 30 seconds to guess as many responses as they can.</li>
//     <li>Before starting each player will choose a multiplier between 1 and 5.</li>
//     <li>After each player has had a turn, their scores will be increased by their correct responses total multiplied by their chosen multiplier.</li>
//     <li>If a player does not make any correct guesses, their score will be decreased by their number of guesses multiplied by their chosen multiplier. </li>
//     </ul>
//     <div class="multipliers>
//       <label for="p1-multiplier">Player 1, Choose your Score</label>
//       <select id="p1-multiplier">
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//       </select>
//       <label for="p2-multiplier">Player 1, Choose your Score</label>
//       <select id="p2-multiplier">
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//       </select>
//     </div>
//     <p>*Be Ready! Timer will start when button is clicked*</p>
//     <button class="close-modal close-modal-fast-money" type="button">Start FAST MONEY Round</button></div></div>`).insertAfter('#main-survey-guess')
// },

displayWinnerModal(winner, loser) {
  $(`<div id="winner-modal" class="modal-content">
   <h6>Game Over!</h6>
   <h6>${winner.name} is the winner!!!</h6>
   <p>The final score:</p>
   <p>${winner.name} => ${winner.score}</p>
   <p>${loser.name} => ${loser.score}</p>
   <p>Great Job! Click below to play again.</p>
   <button>git reset</button>
   </div>`)
},

changeTimerColor() {
  $('#timer').css('background-color', 'pink');
},


};
