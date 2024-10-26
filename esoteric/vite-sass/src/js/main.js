import '../scss/style.scss';

const changeThemeButton = document.querySelector('.toggle_theme-btn');

const htmlElement = document.querySelector('html');

changeThemeButton.addEventListener('click', () => {
   htmlElement.classList.toggle('dark');
});
