import { postFeedback } from './api.js';
import { API_KEYS, paymentURL, STATUS_MESSAGE } from './constants.js';
import { createChatBotDataMap } from './bot-message-formatter.js';
import { showMessage } from './status-notifier.js';
import { validateFields } from './validator.js';

const feedbackForm = document.querySelector('.form');
const submitButton = document.querySelector('.form__button-submit');

const statusHTMLElement = document.querySelector('.status-text');

const onSuccess = () => {
   const message = STATUS_MESSAGE.SENDING_SUCCESS;
   showMessage(true, message);
   feedbackForm.reset();
};

const onError = (error = '') => {
   const errorMessage = error?.message ?? error;
   const message = STATUS_MESSAGE.SENDING_FAILED + errorMessage;
   showMessage(false, message);
};

const hadleDataSend = async (formData) => {
   try {
      const response = await postFeedback(API_KEYS.bot_token, formData);
      if (!response.ok) {
         onError(STATUS_MESSAGE.SENDING_ERROR);
         throw Error(response.error);
      }

      // const data = await response.json();
      submitButton.disabled = true;

      return onSuccess();
   } catch (error) {
      onError(error);
   }
};

const hadleSubmit = (e) => {
   e.preventDefault();
   const formData = new FormData(feedbackForm);
   const isError = validateFields(formData);
   if (isError) {
      return showMessage(false, isError);
   }
   showMessage();
   const formattedDataMap = createChatBotDataMap(formData);
   hadleDataSend(formattedDataMap);

   window.open(paymentURL);
};

feedbackForm.addEventListener('submit', (e) => hadleSubmit(e));

export { statusHTMLElement as statusMessageDivElement };
