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

  displayStartModal(p1) {
    $(`<div id="start-modal" class="modal-structure">
      <div class="modal-content">
        <h6>ROUND: ONE</h6>
        <ul>
          <li>Each player will alternate guessing the top 3 reponses to a question.</li>
          <li>When a correct guess is made, that player's score will increase by the number of responses.</li>
          <li>The round will end after all three responses have been guessed.</li>
          <li>After 2 rounds you will play a FAST MONEY Round!</li>
        </ul>
        <h6>${p1}, you are up first!</h6>
        <button class="close-modal-start" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  displayRoundModal(p2) {
    $(`<div id="round-modal" class="modal-structure">
      <div class="modal-content">
        <h6>ROUND: TWO</h6>
        <p class="winner-p">${p2}, it is your turn to guess first!</p>
        <button class="close-modal-round" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  displayFastMoneyModal(p1, p2) {
    $(`<div id="fastmoney-modal" class="modal-structure">
      <div id="fastmoney-modal-content" class="modal-content">
        <h6>ROUND: FAST MONEY</h6>
        <ul>
          <li>Each player will have 30 seconds to guess as many responses as they can.</li>
          <li>Before starting each player will choose a multiplier between 1 and 5.</li>
          <li>After each player has had a turn, their scores will be increased by their correct responses total times their chosen multiplier.</li>
          <li>If a player does not make any correct guesses, their score will be decreased by their number of guesses times their chosen multiplier.</li>
        </ul>
            <p class="winner-p">Choose your multipliers</p>
          <div id="multipliers">
            <label for="p1-multiplier">${p1}</label>
            <select id="p1-multiplier">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            </br>
            <label for="p2-multiplier">${p2}</label>
            <select id="p2-multiplier">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        <h6>Be ready ${p1}, You are going first!</h6>
        <p class="winner-p">Timer will start when button is clicked.</p>
        <button class="close-modal-fast-money" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  displayFastMoneyModal2(p2) {
    $(`<div id="fastmoney-modal2" class="modal-structure">
      <div class="modal-content">
        <h6>${p2}, it is your turn!</h6>
        <p class="winner-p">Timer will start when button is clicked.</p>
        <button class="close-modal-fast-money2" type="button">git push</button>
      </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  displayWinnerModal(winner, loser, answers) {
    $(`<div id="winner-modal" class="modal-structure">
      <div class="modal-content">
         <h6>${winner.name} is the winner!!!</h6>
         <p class="winner-p">${winner.name}: ${winner.score} <span id="point"> > </span> ${loser.name}: ${loser.score}</p>
        <section id="survey1">
          <h2 id="answer1" class="survey-num">${answers[0].answer}</h2>
          <h2 id="score1"class="survey-score">${answers[0].respondents}</h2>
        </section>
        <section id="survey2">
          <h2 id="answer2" class="survey-num">${answers[1].answer}</h2>
          <h2 id="score2" class="survey-score">${answers[1].respondents}</h2>
        </section>
        <section id="survey3">
          <h2 id="answer3" class="survey-num">${answers[2].answer}</h2>
          <h2 id="score3" class="survey-score">${answers[2].respondents}</h2>
        </section>
         <button class="new-game">git reset</button>
       </div>
    </div>`).insertAfter('#main-survey-guess')
  },

  changeTimerColor() {
    $('#timer').css('background-color', 'pink');
  },

  correctGuessIndicator() {
    $('#guess-input').css('border', '5px solid #2A9C2D')
    // audio.correctAudio();
    setTimeout(() => {
      $('#guess-input').css('border', '1px solid lightgrey')
    }, 2000)
  },
  
  incorrectGuessIndicator() {
    $('#guess-input').css('border', '5px solid #F05355')
    // audio.incorrectAudio();
    setTimeout(() => {
      $('#guess-input').css('border', '1px solid lightgrey')
    }, 2000)
  },


};
