import '../scss/style.scss';

const changeThemeButton = document.querySelector('.toggle_theme-btn');
const dropElements = document.querySelectorAll('.questions__dropdown');

const htmlElement = document.querySelector('html');
const topButton = document.querySelector('.top-btn');
const ctaSection = document.querySelector('.cta');
const ctaButton = document.querySelector('.cta__button');

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

[hearedBtn, formCloseBtn, ctaButton].forEach((element) =>
   element.addEventListener('click', () => form.classList.toggle('hidden'))
);

let scrollDisabled = false;
const disableScroll = (disable = true) => (scrollDisabled = disable);

let scrollPositionPrev = 0;

function topButtonShowHandler() {
   const bodyScrollTop = document.body.scrollTop;
   const documentScrollTop = document.documentElement.scrollTop;
   const gettingDown = scrollPositionPrev < documentScrollTop;

   if ((bodyScrollTop > 600 || documentScrollTop > 600) && gettingDown) {
      ctaSection.classList.remove('hidden');
   } else {
      ctaSection.classList.add('hidden');
   }

   if (bodyScrollTop > 1000 || documentScrollTop > 1000) {
      topButton.style.display = 'block';
   } else {
      topButton.style.display = 'none';
   }

   scrollPositionPrev = documentScrollTop;
   disableScroll(false);
}

window.addEventListener('scroll', () => {
   if (!scrollDisabled) {
      disableScroll();
      setTimeout(topButtonShowHandler, 1200);
   }
});
