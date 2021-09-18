'use strict';

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const current0 = document.querySelector('#current-0');
const current1 = document.querySelector('#current-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let scores, currentScore, activePlayer, playing;

// STARTING CONDITIONS FUNCTION
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  diceEl.classList.add('hidden');
};

init();

// FUNCTION FOR SWITCHING PLAYERS
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // GENERATING A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    // DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    // CHECK FOR ROLLED 1
    if (dice !== 1) {
      // ADD DICE TO THE CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

// HOLDING THE CURRENT SCORE LOGIC
btnHold.addEventListener('click', function () {
  if (playing) {
    // ADD CURRENT SCORE TO ACTIVE PLAYER´S SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    // CHECK IF PLAYER´S IS >= 100
    if (scores[activePlayer] >= 10) {
      // FINISH GAME
      playing = false;
      diceEl.classList.add('hidden');

      const active = document.querySelector(`.player-${activePlayer}`);
      active.classList.add('player-winner');
      active.classList.remove('player-active');
    } else {
      // SWITCH TO THE NEXT PLAYER
      switchPlayer();
    }
  }
});

// STARTING NEW GAME
btnNew.addEventListener('click', init);
