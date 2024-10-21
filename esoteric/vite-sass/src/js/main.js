import '../scss/style.scss';

const counterDiv = document.querySelector('.counter');
const sassButton = document.querySelector('.sass-btn');

sassButton.addEventListener('click', () => {
   counterDiv.innerText = Number(counterDiv.innerHTML) + 1;
});
