export const chartInputHandler = (e, regex) => (!regex.test(e.key) ? e.preventDefault() : e.key);

export const getCurrentTime = () => new Date().toString();

export const dateTimeMessageFormatt = (date) =>
   `${date.substring(8, 10)} ${date.substring(4, 7)} ${date.substring(11, 24)}`;



export const regExpName = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]{3,40}$/i;

export const regExpPhone = /^[+]?[-0-9]{10,30}$/;
