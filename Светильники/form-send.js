// EXAMPLE POST QUERY - from postman
// https://api.telegram.org/bot6717439509:AAHaPvuHO3WORt6_3p3CMIJgoCp5fECbX8s/sendMessage?chat_id=843486240&text=Hello Vova, this is a postman ddsaad ..

// const chat_id = `843486240`; // Володимир Кузнєцов

// // параметры, которые отправятся в api телеграм
// const params = {
//    chat_id: tg_user, // id получателя
//    text: textMessage, // текст сообщения
//    parse_mode: 'HTML'
// }; // режим отображения сообщения HTML (не все HTML теги работают)

// const regExpTextArea = /[a-z а-яёЁЇїІіЄєҐґ 0-9 ,.'\-)(\+]/i;

const bot_token = `6717439509:AAHaPvuHO3WORt6_3p3CMIJgoCp5fECbX8s`; // токен бота
const chat_id = `843486240`; // id користувача vkuznietsov28

const regExpName = /[a-z а-яёЁЇїІіЄєҐґ ,.'-]/i;
const regExpPhone = /[\d-\+]/;

const formOrder = document.querySelector('form.order_form');
const submitButton = document.querySelector('.button.submit');
const inputName = document.querySelector('form.order_form input[name="name"]');
const inputNumber = document.querySelector('form.order_form input[name="phone"]');
const itemName = document.querySelector('.title_block h1.main_title').textContent.trim();
const itemPrice = document.querySelector('.price_item.new .value').textContent.trim();
const formMessage = document.querySelector('.form-message');

const inputNameHandler = (e, regex) => (!regex.test(e.key) ? e.preventDefault() : e.key);

const getCurrentTime = () => new Date().toString();
const dateTimeMessageFormatt = (date) => `${date.substring(8, 10)} ${date.substring(4, 7)} ${date.substring(11, 24)}`;

const textMessageFormatter = ({ name, tel, item, price, count = 1, msg = '-' }) => {
   const time = dateTimeMessageFormatt(getCurrentTime());
   return `<b> НОВЕ ЗАМОВЛЕННЯ ✉️ з сайту</b> - Набір LED світильників:
<b>Ім'я:</b> ${name}
<b>Телефон:</b> ${tel}
<b>Повідомлення:</b> ${msg}
<b>Замовлення:</b> ${item}
<b>Кількість:</b> ${count}
<b>Ціна:</b> ${price}
<b>Надіслано:</b> ${time}`;
};

// POST API TO TELEGRAM BOT

const postFeedback = async (TOKEN, DATA, METHOD_NAME = `sendMessage`) => {
   const response = await fetch(`https://api.telegram.org/bot${TOKEN}/${METHOD_NAME}`, {
      method: 'POST',
      body: DATA
   });
   if (!response.ok) throw new Error("User's registration Failed. Error");
   const data = await response.json();
   return data;
};

// <--/ POST API TO TELEGRAM BOT -->

const onFormSubmit = (e) => {
   e.preventDefault();
   const formData = new FormData(formOrder);

   const formValues = {
      name: formData.get('name'),
      tel: formData.get('phone'),
      msg: formData.get('message') || ' - ',
      item: itemName,
      price: itemPrice
   };

   const textMessage = textMessageFormatter(formValues);

   formData.append('chat_id', chat_id);
   formData.append('text', textMessage);
   formData.append('parse_mode', 'HTML');

   return formData;
};

const hideFormAfterFourSec = () => {
   window.setTimeout(() => {
      formMessage.classList.add('hidden');
   }, 5000);

   window.setTimeout(() => {
      document.querySelectorAll('.button').forEach((btn) => btn.classList.add('disabled'));
   }, 2500);
};

const onSuccess = () => {
   formMessage.innerHTML = `<span class='green'>Дякуємо! Ваше замовлення отримано.</span>`;
   formOrder.reset();
   submitButton.disabled = true;
   hideFormAfterFourSec();
};

const onError = () => {
   formMessage.innerHTML = `<span class='red'>*Помилка відправки Замовлення... Можливо ви ввели не коректні дані </span>`;
};

const hadleSubmit = (formData) => {
   return new Promise(function (resolve, reject) {
      postFeedback(bot_token, formData)
         .then((data) => {
            onSuccess();
         })
         .catch((error) => {
            onError();
            console.log(error.message);
            submitButton.disabled = true;
            reject(error.message);
         });
   });
};

formOrder.onsubmit = (e) => hadleSubmit(onFormSubmit(e));

inputName.addEventListener('keypress', (e) => inputNameHandler(e, regExpName));
inputNumber.addEventListener('keypress', (e) => inputNameHandler(e, regExpPhone));
