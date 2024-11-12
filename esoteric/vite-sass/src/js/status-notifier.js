import { statusMessageDivElement } from './form-handler.js';

export const showMessage = (isSuccess = false, message = '', element = statusMessageDivElement) => {
   const color = isSuccess ? 'green' : 'red';
   const textMessage = `<span class=${color}>${message}</span>`;
   element.innerHTML = textMessage;
};
