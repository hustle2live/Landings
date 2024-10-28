import '../scss/style.scss';

const changeThemeButton = document.querySelector('.toggle_theme-btn');
const dropElements = document.querySelectorAll('.questions__dropdown');

const htmlElement = document.querySelector('html');

changeThemeButton.addEventListener('click', () => {
   htmlElement.classList.toggle('dark');
});

const closeDrops = () => {
   dropElements.forEach((el) => el.classList.remove('active'));
};

dropElements.forEach((el) =>
   el.addEventListener('click', () => {
      const [...classList] = el.classList;
      closeDrops();
      if (!classList.includes('active')) el.classList.add('active');
   })
);
