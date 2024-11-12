export const STATUS_MESSAGE = {
   SENDING_SUCCESS: "Дякуємо! Ваше повідомлення отримано. Ми зв'яжемося з Вами найближчим часом!",
   SENDING_FAILED: 'Помилка відправки повідомлення... ',
   PHONE_ERROR:
      'Помилка заповнення. Номер телефону має бути не менше 10 символів та може містити лише цифри 0-9 у форматі 0XX-XXX-XX-XX',
   NAME_ERROR:
      "Помилка заповнення. Ім'я може містити лише букви та деякі символи ( ' - . ) та має бути від 3х до 40 символів",
   SENDING_ERROR: "User's registration Failed. Error"
};

const my_bot_token = '7942429140:AAEW-zohlci-fVpzUq7MS5IDvgm0jwHEbhk';

const sveta_chat_id = '461474441'; // Світлана Т.

const vova_chat_id = '843486240'; // Володимир К.

export const API_KEYS = {
   bot_token: my_bot_token,
   chat_id: vova_chat_id
};

// const bot_token = process.env.BOT_TOKEN
// const chat_id = process.env.CHAT_ID;
