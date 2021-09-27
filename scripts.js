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
let actionsBtns = document.querySelector('.game-manu__actions');
let startBtn = document.querySelector('.welcome__start-btn');
let leftTime = document.querySelector('.game__title span');
let screens = document.querySelectorAll('.full-screen');
let time;

startBtn.addEventListener('click', (e) => {
  const currentScreen = e.target.closest('.full-screen');
  currentScreen.classList.add('up');
});

actionsBtns.addEventListener('click', chooseTime);

function chooseTime(e) {
  const currentScreen = e.target.closest('.full-screen');
  let seconds = parseInt(e.target.getAttribute('data-time'));
  time = seconds;
  currentScreen.classList.add('up');
  setInterval(() => {
    startGame();
  }, 1000);
}

function startGame() {
  if (time < 0) {
    return;
  } else {
    if (time >= 10) {
      leftTime.textContent = `00:${time}`;
    } else {
      leftTime.textContent = `00:0${time}`;
    }
    time--;
  }
}
