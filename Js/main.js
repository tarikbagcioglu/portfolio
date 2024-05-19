const logoEl = document.querySelector(".limited-width-container > a");


//ustune gelince degisen logo
const htmlLogo = document.querySelector(".logo > i:nth-child(1)");
const cssLogo = document.querySelector(".logo > i:nth-child(2)");
const jsLogo = document.querySelector(".logo > i:nth-child(3)");

logoEl.addEventListener("mouseover", (e) => {
  htmlLogo.style.opacity = "1";
  cssLogo.style.opacity = "0";
  jsLogo.style.opacity = "0";
});

logoEl.addEventListener("mouseout", (e) => {
  htmlLogo.style.opacity = "0";
  cssLogo.style.opacity = "1";
  jsLogo.style.opacity = "0";
});

logoEl.addEventListener("mousedown", (e) => {
  htmlLogo.style.opacity = "0";
  cssLogo.style.opacity = "0";
  jsLogo.style.opacity = "1";
});

// hamburger menu
const hamburgerNavEl = document.querySelector(".nav-hamburger");
const hamburgerBtnEl = document.querySelector(".nav-hamburger > button");

hamburgerBtnEl.addEventListener("click", handleToggleClick);

function handleToggleClick(e) {
  hamburgerNavEl.classList.toggle("active");
}

// Kaydirma

const prevScrollpos = window.scrollY;

const headerDiv = document.querySelector("header");
const bannerDiv = document.querySelector(".banner");
const bannerBottom = bannerDiv.offsetTop + bannerDiv.offsetHeight;


window.onscroll = function() {
  const currentScrollPos = window.scrollY;

  if (currentScrollPos > bannerBottom){  
      headerDiv.style.position = 'static';
  } else {
    headerDiv.style.position = 'fixed';
  }
}

const mainEl = document.querySelector("main");
const aboutPageEl = document.querySelector("#about-page");
const aboutButton = document.querySelector(
  ".nav-hamburger > ul > li:nth-child(3)"
);

aboutButton.addEventListener("click", handleOpenNewPageClick );


function handleOpenNewPageClick(e) {
  aboutPageEl.classList.add("active");
  mainEl.classList.add("display");
  headerDiv.classList.add("staticClass");
}

 //smoothly anchorla linkteki sectiona tasima

const homeButton = document.querySelector(
  ".nav-hamburger > ul > li:nth-child(1)"
);
const worksButton = document.querySelector(
  ".nav-hamburger > ul > li:nth-child(2)"
);

homeButton.addEventListener("click", handleClickShift);
function handleClickShift(e) {
  aboutPageEl.classList.remove("active");
  mainEl.classList.remove("display");
  headerDiv.classList.remove("staticClass");
  document
    .getElementById("first-jump-to-this-location")
    .scrollIntoView({ behavior: "smooth" });
}

worksButton.addEventListener("click", handleClickShift);
function handleClickShift(e) {
  aboutPageEl.classList.remove("active");
  mainEl.classList.remove("display");
  headerDiv.classList.remove("staticClass");
  document
    .getElementById("second-jump-to-this-location")
    .scrollIntoView({ behavior: "smooth" });
}

//card container

const cardContainer = document.querySelector(".cards-container");
const cardBg = document.querySelector(".card-bg");
const cards = document.querySelectorAll(".card");
const cardInitial = document.querySelector("[data-card-initial]");

cards.forEach((card) => {
  card.addEventListener("mouseover", () => {
    setCardVariables(card);
  });
});

cardContainer.addEventListener("mouseout", () => {
  setCardVariables(cardInitial);
});

function setCardVariables(card) {
  const hoverColor = card.getAttribute("data-hover-color") || "blue";
  const cardRect = card.getBoundingClientRect();
  const containerRect = cardContainer.getBoundingClientRect();

  const top = cardRect.top - containerRect.top + "px";
  const left = cardRect.left - containerRect.left + "px";
  const width = cardRect.width + "px";
  const height = cardRect.height + "px";

  cardBg.style.setProperty("--card-bg-top", top);
  cardBg.style.setProperty("--card-bg-left", left);
  cardBg.style.setProperty("--card-bg-width", width);
  cardBg.style.setProperty("--card-bg-height", height);
  cardBg.style.setProperty("--card-bg-color", hoverColor);
}

setCardVariables(cardInitial);

window.addEventListener("resize", () => {
  setCardVariables(document.querySelector(".card:hover") || cardInitial);
});

// Carousel
const carouselNavButtonList = document.querySelectorAll(
  " .carousel nav > button"
);

const slideListEl = document.querySelector(" .carousel .slide-list");

carouselNavButtonList.forEach((myButton) => {
  myButton.addEventListener("click", handleClick);
});

const widthOfCarouselEl = document.querySelector(".card").offsetWidth;
const button1 = document.querySelector(".carousel button:first-child");

function handleClick(e) {
  const target = e.target;
  const index = target.dataset.index;
  currentIndex = index;

  slideListEl.style.marginLeft = currentIndex * -100 + "%";
}

let currentIndex = 1;
function clearSpecialCharAndParseNumber(word) {
  if (word === "") return 0;
  else return Number.parseInt(word.replace("%", "").replace("px", ""));
}

function nextClick(e) {
  const currentMargin = clearSpecialCharAndParseNumber(
    slideListEl.style.marginLeft
  );
  console.log(currentMargin);

  currentIndex = currentIndex + 1;
  slideListEl.style.marginLeft = currentMargin + widthOfCarouselEl + "px";

  if (currentMargin > -widthOfCarouselEl) {
    document.querySelector(".carousel button:first-child").disabled = true;
  } else {
    document.querySelector(".carousel button:last-child").disabled = false;
  }
  //responsive olarak anlik card iteminin width degerini alsin ve ona gore yon tuslarini aktif etsin veya disaktif etsin + slide-listi o kadar (item width) marginLeft vererek kaydirsin diye bir yontem denedim ama calisiyor mu emin degilim. Ekrana kuculttugumde calismadi yeniden cache etmesi gerekti. Ancak sanirim telefonla girildiginde yeniden cache etmesine gerek olmadigi icin responsive olacak
}
function previousClick(e) {
  const currentMargin = clearSpecialCharAndParseNumber(
    slideListEl.style.marginLeft
  );

  console.log(currentMargin);
  currentIndex = currentIndex - 1;

  slideListEl.style.marginLeft = currentMargin - widthOfCarouselEl + "px";

  if (currentMargin < -(widthOfCarouselEl * 3)) {
    document.querySelector(".carousel button:last-child").disabled = true;
  } else {
    document.querySelector(".carousel button:first-child").disabled = false;
  }
}
