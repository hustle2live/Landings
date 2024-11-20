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
const [bgOne, bgTwo, bgThree] = ["./images/background/1.jpg", "./images/background/2.jpg", "./images/background/6.jpg"];
const framePathDefault = bgTwo;
const allWebLinks = Array.from(document.querySelectorAll(".webLink"));
const iframe = document.querySelector(".website-preview > iframe");
const previewButtonsAll = Array.from(document.querySelectorAll(".btn-responce"));
allWebLinks.forEach((link) => {
  link.addEventListener("mouseover", function(e) {
    try {
      iframe.setAttribute("src", this.getAttribute("href"));
    } catch (error) {
      iframe.setAttribute("src", framePathDefault);
    }
  });
  link.addEventListener("click", function(e) {
    e.preventDefault();
    if (window.screen.width < 768) {
      iframe.scrollIntoView();
    }
    e.stopPropagation();
  });
});
document.querySelector(".content").addEventListener("click", () => {
  iframe.setAttribute("src", "");
});
previewButtonsAll.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    for (const button of previewButtonsAll) {
      button.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    const isMobile = e.currentTarget.classList.contains("mobile");
    if (isMobile) {
      iframe.classList.add("mobile");
    } else {
      iframe.classList.remove("mobile");
    }
    e.stopPropagation();
  });
});
document.querySelector(".background");
