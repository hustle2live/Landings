import { dateTimeMessageFormatt, getCurrentTime } from './helpers';
import { API_KEYS } from './constants.js';

export const textMessageFormatter = ({ name, telephone, message = '-' }) => {
   const currentTime = dateTimeMessageFormatt(getCurrentTime());

   const createPostMessage = `<b>📪 ЗАЯВКА з сайту Taro-kliuchsveta.com ♥️💫🌠 </b>
  Форма зворотнього зв'язку - <b>"Онлайн-курс Таро"</b>
  <b>Ім'я 👤 : </b> ${name}
  <b>Телефон 📞 : </b> ${telephone}
  <b>Повідомлення: " - заявка на сплату курсу 💸"</b> ${message}
  <b>Час відправлення:</b> ${currentTime}`;

   return createPostMessage;
};

export const createChatBotDataMap = (formData) => {
   const formValues = {
      name: formData.get('user-name'),
      telephone: formData.get('user-phone'),
      message: formData.get('user-message') ?? ''
   };

   const textMessage = textMessageFormatter(formValues);

   formData.append('chat_id', API_KEYS.chat_id);
   formData.append('text', textMessage);
   formData.append('parse_mode', 'HTML');

   return formData;
};
