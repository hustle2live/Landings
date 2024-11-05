import '../scss/style.scss';

const changeThemeButton = document.querySelector('.toggle_theme-btn');
const dropElements = document.querySelectorAll('.questions__dropdown');

const htmlElement = document.querySelector('html');
const topButton = document.querySelector('.top-btn');

const hearedBtn = document.querySelector('.header__button');
const formCloseBtn = document.querySelector('.close-btn');
const form = document.querySelector('.form-wrapper');

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

[hearedBtn, formCloseBtn].forEach((element) =>
   element.addEventListener('click', () => form.classList.toggle('hidden'))
);

let scrollDisabled = false;
const disableScroll = (disable = true) => (scrollDisabled = disable);

function topButtonShowHandler() {
   const bodyScrollTop = document.body.scrollTop;
   const documentScrollTop = document.documentElement.scrollTop;

   if (bodyScrollTop > 1000 || documentScrollTop > 1000) {
      topButton.style.display = 'block';
   } else {
      topButton.style.display = 'none';
   }
   disableScroll(false);
}

window.addEventListener('scroll', () =>
   scrollDisabled ? null : disableScroll() && setTimeout(topButtonShowHandler, 3000)
);