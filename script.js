'use strict';

// Selection dom elements
const playerName1 = document.getElementById('name--0');
const playerName2 = document.getElementById('name--1');
const scoreEl_1 = document.getElementById('score--0');
const scoreEl_2 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEl_1 = document.getElementById('current--0');
const currentEl_2 = document.getElementById('current--1');
const playerEL_1 = document.querySelector('.player--0');
const playerEL_2 = document.querySelector('.player--1');
const notification = document.querySelector('.notification');
const okBtn = document.getElementById('ok');
const modal = document.querySelector('.modal');
const player1Input = document.getElementById('texInput1');
const player2Input = document.getElementById('texInput2');
const modalContent = document.querySelector('.modal-content');

let activeOk = false;

let scores, currentScore, activePlayer, isPlaying;

const initGame = function () {
  isPlaying = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  scoreEl_1.textContent = 0;
  scoreEl_2.textContent = 0;
  currentEl_1.textContent = 0;
  currentEl_2.textContent = 0;

  diceEl.classList.remove('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  player1Input.value = '';
  player2Input.value = '';

  playerName1.textContent = `PLAYER 1`;
  playerName2.textContent = `PLAYER 2`;

  modal.classList.remove('hiddenModal');
};

initGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEL_1.classList.toggle('player--active');
  playerEL_2.classList.toggle('player--active');
  scores[activePlayer] += currentScore;
};

const rollDice = function () {
  if (isPlaying) {
    // generating random dice number
    let dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;

    //  check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // switch to to next player
    } else {
      switchPlayer();
    }
  }
};

const holdDice = function () {
  if (isPlaying) {
    //  add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if players score >= 100, finish game
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      const winner = document
        .querySelector('.player--winner')
        .querySelector('.name').textContent;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      const notificationElement = notification.querySelector('p');
      notificationElement.textContent = `${winner} You Made It`;

      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        // notificationElement.textContent = ``;
      }, 8000);
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdDice);
btnNew.addEventListener('click', initGame);

okBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const form = document.getElementById('form');
  if (form.checkValidity()) {
    modal.classList.add('hiddenModal');
    playerName1.textContent = player1Input.value.toLocaleUpperCase();
    playerName2.textContent = player2Input.value.toLocaleUpperCase();
  } else {
    modalContent.classList.add('blink');
    // this.classList.add('blink');
    setTimeout(() => {
      modalContent.classList.remove('blink');
      // this.classList.remove('blink');
    }, 400);
  }
});
