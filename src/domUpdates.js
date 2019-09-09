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

  displayStartModal(round, p1) {
    $(`<div id="start-modal" class="modal-structure">
      <div class="modal-content">
        <h6>Ready to feud?</h6>
        <h6>Lets start... ROUND: ${round}</h6>
        <ul>
          <li>Each player will alternate guessing the top 3 reponses to a question.</li>
          <li>When a correct guess is made, that player's score will increase by the number of responses.</li>
          <li>The round will end after all three responses have been guessed.</li>
          <li>After 2 rounds you will play a FAST MONEY Round!</li>
        </ul>
        <h6>${p1} you are up first!</h6>
        <h6>Get ready!</h6>
        <button class="close-modal-start" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
},

  displayRoundModal(round, p2) {
    $(`<div id="round-modal" class="modal-structure">
      <div class="modal-content">
        <h6>Nice work!</h6>
        <h6>Up next... ROUND: ${round}</h6>
        <h6>${p2} it is your turn to guess first!</h6>
        <p>Click the button when you are ready.</p>
        <button class="close-modal-round" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  displayFastMoneyModal(round, p1, p2) {
    $(`<div id="fastmoney-modal" class="modal-structure">
      <div id="fastmoney-modal-content" class="modal-content">
        <h6>Time to think fast!</h6>
        <h6>Lets begin... ROUND: ${round}</h6>
        <ul>
          <li>Each player will have 30 seconds to guess as many responses as they can.</li>
          <li>Before starting each player will choose a multiplier between 1 and 5.</li>
          <li>After each player has had a turn, their scores will be increased by their correct responses total multiplied by their chosen multiplier.</li>
          <li>If a player does not make any correct guesses, their score will be decreased by their number of guesses multiplied by their chosen multiplier. </li>
        </ul>
          <div id="multipliers">
            <label for="p1-multiplier">${p1}, choose your multiplier</label>
            <select id="p1-multiplier">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            </br>
            <label for="p2-multiplier">${p2}, choose your multiplier</label>
            <select id="p2-multiplier">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        <h6>Be ready ${p1}! You are going first!</h6>
        <p>Timer will start when button is clicked.</p>
        <button class="close-modal-fast-money" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  displayFastMoneyModal2(round, p2) {
    $(`<div id="fastmoney-modal2" class="modal-structure">
      <div class="modal-content">
        <h6>Great job!</h6>
        <h6>${p2} it is your turn!</h6>
        <p>Timer will start when button is clicked.</p>
        <button class="close-modal-fast-money2" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  displayWinnerModal(winner, loser) {
    $(`<div id="winner-modal" class="modal-structure">
      <div class="modal-content">
         <h6>Game over!</h6>
         <h6>${winner.name} is the winner!!!</h6>
         <p class="winner-p">The final score:</p>
         <p class="winner-p">${winner.name} => ${winner.score}</p>
         <p class="winner-p">${loser.name} => ${loser.score}</p>
         <h6>Great job!</h6>
         <p>Click below to play again.</p>
         <button class="new-game">git reset</button>
       </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  changeTimerColor() {
    $('#timer').css('background-color', 'pink');
  },

  correctGuessIndicator() {
    $('#guess-input').css('border', '3px solid #2A9C2D')
    // let audio = new Audio('../src/sound/incorrect.mp3');
    // audio.play();
    setTimeout(() => {
      $('#guess-input').css('border', '1px solid lightgrey')
    }, 1000)
  },
  
  incorrectGuessIndicator() {
    $('#guess-input').css('border', '3px solid #F05355')
    // let audio = new Audio('../src/sound/incorrect.mp3');
    // audio.play();
    setTimeout(() => {
      $('#guess-input').css('border', '1px solid lightgrey')
    }, 1000)
  },


};
