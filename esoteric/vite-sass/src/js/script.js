import '../scss/style.scss';

const [bgOne, bgTwo, bgThree] = ['./images/background/1.jpg', './images/background/2.jpg', './images/background/6.jpg'];
const framePathDefault = bgTwo;
const allWebLinks = Array.from(document.querySelectorAll('.webLink'));
const iframe = document.querySelector('.website-preview > iframe');
const previewButtonsAll = Array.from(document.querySelectorAll('.btn-responce'));

allWebLinks.forEach((link) => {
   link.addEventListener('mouseover', function (e) {
      try {
         iframe.setAttribute('src', this.getAttribute('href'));
      } catch (error) {
         iframe.setAttribute('src', framePathDefault);
      }
   });
   link.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.screen.width < 768) {
         iframe.scrollIntoView();
      }
      e.stopPropagation();
   });
});

document.querySelector('.content').addEventListener('click', () => {
   iframe.setAttribute('src', '');
});

previewButtonsAll.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      for (const button of previewButtonsAll) {
         button.classList.remove('active');
      }
      e.currentTarget.classList.add('active');

      const isMobile = e.currentTarget.classList.contains('mobile');
      if (isMobile) {
         iframe.classList.add('mobile');
      } else {
         iframe.classList.remove('mobile');
      }

      e.stopPropagation();
   });
});

const background = document.querySelector('.background');

let position = 0;
const speed = 0.5;

const animateBackground = () => {
   position -= speed;
   background.style.backgroundPosition = `center ${position}px`;
   requestAnimationFrame(animateBackground);
};

// animateBackground();
