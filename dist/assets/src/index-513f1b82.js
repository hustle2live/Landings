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
const framePathDefault = "./dist/assets/preview-1.png";
const allWebLinks = Array.from(document.querySelectorAll(".webLink"));
const iframe = document.querySelector(".website-preview > iframe");
const previewButtonsAll = Array.from(document.querySelectorAll(".btn-responce"));
const isRevizorPreview = (el) => {
  if (el.includes("revizoravto")) {
    const revizorPreviewPng = revizorGetLink();
    iframe.setAttribute("src", revizorPreviewPng);
  }
};
allWebLinks.forEach((link) => {
  link.addEventListener("mouseover", function(e) {
    try {
      const linkPath = link.getAttribute("href");
      iframe.setAttribute("src", linkPath);
      isRevizorPreview(linkPath);
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
  iframe.setAttribute("src", framePathDefault);
});
function revizorGetLink() {
  const [xsMobile, mobile, desktop] = [
    "screencapture_385px_revizoravto_ua_uk_new_2024_01_04_20_52_27.png",
    "screencapture_425px_revizoravto_ua_uk_new_2024_01_04_20_52_27.png",
    "screencapture_1920px_revizoravto_ua_uk_new_2024_01_04_20_47_58.png"
  ];
  const previewScreen = document.querySelector(".website-preview iframe").clientWidth;
  let pictureSize;
  const sourcePath = "./dist/assets/";
  switch (true) {
    case previewScreen < 425:
      pictureSize = xsMobile;
      break;
    case previewScreen < 500:
      pictureSize = mobile;
      break;
    default:
      pictureSize = desktop;
  }
  return sourcePath.concat(pictureSize);
}
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
    isRevizorPreview(iframe.getAttribute("src"));
    e.stopPropagation();
  });
});
document.querySelector(".background");
