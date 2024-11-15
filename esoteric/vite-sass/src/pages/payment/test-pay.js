const testPayForm = document.querySelector('.test-pay__button-form');

const testPaymentURL = 'https://secure.wayforpay.com/button/b3b1c1b14fa8d';

const testPayHandler = (e) => {
   e.preventDefault();

   window.open(testPaymentURL);
};

testPayForm.addEventListener('submit', (e) => {
   testPayHandler(e);
});
