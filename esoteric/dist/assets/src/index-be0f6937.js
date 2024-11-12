(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const changeThemeButton = document.querySelector(".toggle_theme-btn");
const dropElements = document.querySelectorAll(".questions__dropdown");
const htmlElement = document.querySelector("html");
const topButton = document.querySelector(".top-btn");
const ctaSection = document.querySelector(".cta");
const ctaButton = document.querySelector(".cta__button");
const hearedBtn = document.querySelector(".header__button");
const formCloseBtn = document.querySelector(".close-btn");
const form = document.querySelector(".form-wrapper");
changeThemeButton.addEventListener("click", () => {
  htmlElement.classList.toggle("dark");
});
const closeDrops = () => {
  dropElements.forEach((el) => el.classList.remove("active"));
};
dropElements.forEach(
  (el) => el.addEventListener("click", () => {
    const [...classList] = el.classList;
    closeDrops();
    if (!classList.includes("active"))
      el.classList.add("active");
  })
);
[hearedBtn, formCloseBtn, ctaButton].forEach(
  (element) => element.addEventListener("click", () => form.classList.toggle("hidden"))
);
let scrollDisabled = false;
const disableScroll = (disable = true) => scrollDisabled = disable;
let scrollPositionPrev = 0;
function topButtonShowHandler() {
  const bodyScrollTop = document.body.scrollTop;
  const documentScrollTop = document.documentElement.scrollTop;
  const gettingDown = scrollPositionPrev < documentScrollTop;
  if ((bodyScrollTop > 600 || documentScrollTop > 600) && gettingDown) {
    ctaSection.style.display = "flex";
    ctaSection.classList.remove("hidden");
  } else {
    ctaSection.classList.add("hidden");
    setTimeout(() => {
      ctaSection.style.display = "none";
    }, 1e3);
  }
  if (bodyScrollTop > 1e3 || documentScrollTop > 1e3) {
    topButton.style.display = "flex";
  } else {
    topButton.style.display = "none";
  }
  scrollPositionPrev = documentScrollTop;
  disableScroll(false);
}
window.addEventListener("scroll", () => {
  if (!scrollDisabled) {
    disableScroll();
    setTimeout(topButtonShowHandler, 1200);
  }
});
const postFeedback = async (TOKEN, DATA, METHOD_NAME = `sendMessage`) => {
  console.log("sending...");
  return await fetch(`https://api.telegram.org/bot${TOKEN}/${METHOD_NAME}`, {
    method: "POST",
    body: DATA
  });
};
const STATUS_MESSAGE = {
  SENDING_SUCCESS: "Дякуємо! Ваше повідомлення отримано. Ми зв'яжемося з Вами найближчим часом!",
  SENDING_FAILED: "Помилка відправки повідомлення... ",
  PHONE_ERROR: "Помилка заповнення. Номер телефону має бути не менше 10 символів та може містити лише цифри 0-9 у форматі 0XX-XXX-XX-XX",
  NAME_ERROR: "Помилка заповнення. Ім'я може містити лише букви та деякі символи ( ' - . ) та має бути від 3х до 40 символів",
  SENDING_ERROR: "User's registration Failed. Error"
};
const my_bot_token = "*****************************";
const vova_chat_id = "********";
const API_KEYS = {
  bot_token: my_bot_token,
  chat_id: vova_chat_id
};
const getCurrentTime = () => (/* @__PURE__ */ new Date()).toString();
const dateTimeMessageFormatt = (date) => `${date.substring(8, 10)} ${date.substring(4, 7)} ${date.substring(11, 24)}`;
const regExpName = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]{3,40}$/i;
const regExpPhone = /^[+]?[-0-9]{10,30}$/;
const textMessageFormatter = ({ name, telephone, message = "-" }) => {
  const currentTime = dateTimeMessageFormatt(getCurrentTime());
  const createPostMessage = `<b>📪 ЗАЯВКА з сайту Taro-kliuchsveta.com ♥️💫🌠 </b>
  Форма зворотнього зв'язку - <b>"Онлайн-курс Таро"</b>
  <b>Ім'я 👤 : </b> ${name}
  <b>Телефон 📞 : </b> ${telephone}
  <b>Повідомлення: " - заявка на сплату курсу 💸"</b> ${message}
  <b>Час відправлення:</b> ${currentTime}`;
  return createPostMessage;
};
const createChatBotDataMap = (formData) => {
  const formValues = {
    name: formData.get("user-name"),
    telephone: formData.get("user-phone"),
    message: formData.get("user-message") ?? ""
  };
  const textMessage = textMessageFormatter(formValues);
  formData.append("chat_id", API_KEYS.chat_id);
  formData.append("text", textMessage);
  formData.append("parse_mode", "HTML");
  return formData;
};
const showMessage = (isSuccess = false, message = "", element = statusHTMLElement) => {
  const color = isSuccess ? "green" : "red";
  const textMessage = `<span class=${color}>${message}</span>`;
  element.innerHTML = textMessage;
};
const validateFields = (formData, isError = "") => {
  const userName = formData.get("user-name");
  const userPhone = formData.get("user-phone");
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
const feedbackForm = document.querySelector(".form");
const submitButton = document.querySelector(".form__button-submit");
const statusHTMLElement = document.querySelector(".status-text");
const onSuccess = () => {
  const message = STATUS_MESSAGE.SENDING_SUCCESS;
  showMessage(true, message);
  feedbackForm.reset();
};
const onError = (error = "") => {
  const errorMessage = (error == null ? void 0 : error.message) ?? error;
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
};
feedbackForm.addEventListener("submit", (e) => hadleSubmit(e));
