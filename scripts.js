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
