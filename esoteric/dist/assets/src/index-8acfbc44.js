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
