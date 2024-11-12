import { regExpName, regExpPhone } from './helpers.js';

import { STATUS_MESSAGE } from './constants';

export const validateFields = (formData, isError = '') => {
   const userName = formData.get('user-name');
   const userPhone = formData.get('user-phone');

   const isValidName = regExpName.test(userName.trim());
   const isValidPhone = regExpPhone.test(userPhone);

   switch (true) {
      case !isValidName:
         isError = STATUS_MESSAGE.NAME_ERROR;
         break;
      case !isValidPhone:
         isError = STATUS_MESSAGE.PHONE_ERROR;
         break;
   }

   return isError ?? null;
};
