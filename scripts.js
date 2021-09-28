let themeCahngeBtn = document.querySelector('.theme-changer');

themeCahngeBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
  if (localStorage.getItem('theme') === 'light-theme') {
    initialState('dark-theme');
  } else {
    initialState('light-theme');
  }
}

function initialState(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
  if (themeName === 'light-theme') {
    themeCahngeBtn.firstElementChild.textContent = 'light_mode';
  } else {
    themeCahngeBtn.firstElementChild.textContent = 'nightlight_round';
  }
}

localStorage.getItem('theme') !== 'null' ? initialState(localStorage.getItem('theme')) : initialState('light-theme');
//=========================================== T H E M E  C H A N G E R ==================================================
const cucikebi = [
  [
    'imgs/gregori/01.jpg',
    'imgs/gregori/02.jpg',
    'imgs/gregori/03.jpg',
    'imgs/gregori/04.jpg',
    'imgs/gregori/05.jpg',
    'imgs/gregori/06.jpg',
    'imgs/gregori/07.jpg',
  ],
  ['imgs/uchava/01.jpg', 'imgs/uchava/02.jpg', 'imgs/uchava/03.jpg', 'imgs/uchava/04.jpg'],
  ['imgs/finisi/01.jpg', 'imgs/finisi/02.jpg', 'imgs/finisi/03.jpg', 'imgs/finisi/04.jpg', 'imgs/finisi/05.jpg'],
];
const vladebi = ['imgs/vladi/01.jpg', 'imgs/vladi/02.jpg'];
const colors = ['#12db12', '#e817ff', '#13dde8', '#fced17', '#ffa826'];
const actionsBtns = document.querySelector('.game-manu__actions');
const startBtn = document.querySelector('.welcome__start-btn');
const leftTime = document.querySelector('.game__title span');
const gameBoard = document.querySelector('.game__board');
const screens = document.querySelectorAll('.full-screen');
let end = Date.now() + 1 * 1000;
let timeInterval;
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
  const currentScreen = e.target.closest('.full-screen');
  currentScreen.classList.add('up');
});

actionsBtns.addEventListener('click', chooseTime);

gameBoard.addEventListener('click', (e) => {
  if (e.target.closest('.circle')) {
    gameBoard.innerHTML = '';
    crateCircle();
    crateCircle(true);
    currentUrl = e.target.getAttribute('src');
    if (/finisi/.test(currentUrl)) {
      score += 3;
    } else if (/uchava/.test(currentUrl)) {
      score += 2;
    } else if (/gregori/.test(currentUrl)) {
      score++;
    } else if (/vladi/.test(currentUrl)) {
      score -= 2;
    }
  }
});

function chooseTime(e) {
  if (e.target.classList.contains('game-manu__time-btn')) {
    const currentScreen = e.target.closest('.full-screen');
    let seconds = parseInt(e.target.getAttribute('data-time'));
    time = seconds;
    currentScreen.classList.add('up');
    startGame();
  }
}

function startGame() {
  timeInterval = setInterval(decreaseTime, 1000);
  crateCircle();
  crateCircle(true);
}

function decreaseTime() {
  time--;
  if (time === 0) {
    leftTime.textContent = `00:0${time}`;
    finishGame();
  }
  if (time >= 10) {
    leftTime.textContent = `00:${time}`;
  } else {
    leftTime.textContent = `00:0${time}`;
  }
}

function crateCircle(isVlad) {
  let circle = document.createElement('div');

  let randomCucikaArr;
  let randomCucikaUrl;

  if (isVlad) {
    randomCucikaUrl = vladebi[getRandomNumber(vladebi.length)];
  } else {
    randomCucikaArr = cucikebi[getRandomNumber(cucikebi.length)];
    randomCucikaUrl = randomCucikaArr[getRandomNumber(cucikebi.length)];
  }

  let size = getRangeRandomNumber(25, 50);
  let { width, height } = gameBoard.getBoundingClientRect();
  const x = getRangeRandomNumber(0, width - size);
  const y = getRangeRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.insertAdjacentHTML('afterBegin', `<img src=${randomCucikaUrl} alt="" />`);

  gameBoard.append(circle);
}

function finishGame() {
  clearInterval(timeInterval);
  gameBoard.innerHTML = `<h3 class="game__score-title">score: <span>${score}</span></h3>`;
  document.querySelector('.game__title').classList.add('hide');
  setTimeout(() => {
    gameBoard.firstElementChild.classList.add('active');
  }, 0);
  setTimeout(doConfetti, 400);
}
function getRangeRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

function doConfetti() {
  confetti({
    particleCount: 170,
    angle: 70,
    spread: 140,
    origin: { x: 0 },
    colors: colors,
  });
  confetti({
    particleCount: 170,
    angle: 140,
    spread: 140,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}
