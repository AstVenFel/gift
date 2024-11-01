import { img, paragraph } from "./scenario.js";

const wrapper = document.querySelector(".wrapper");

//Смена картинок и диалогов
let counterClickBtn = 28;
let counterImg = 13;
let counterHeart = 100;

const slider = document.querySelector(".slider");
const btnHistory = document.querySelector(".slider__btn-history");
const sliderNext = document.querySelector(".slider__next");
const sliderText = document.querySelector(".slider__text");
const sliderAct = document.querySelector(".slider__act");
const popup = document.querySelector(".popup");

const changeSliderText = (counterClickBtn) => {
  sliderText.textContent = paragraph[counterClickBtn];
};

const updateBackgroundImage = (counterImg) => {
  wrapper.style.backgroundImage = `url(${img[counterImg]})`;
};

const handleSliderChange = () => {
  if (counterClickBtn < paragraph.length - 1) {
    counterClickBtn += 1;
    if ((counterClickBtn % 2 === 0) & (counterImg < img.length - 1)) {
      counterImg += 1;
      updateBackgroundImage(counterImg);
    }
  }
  changeSliderText(counterClickBtn);
};

const popupTitle = document.querySelector(".popup__title");
const popupText = document.querySelector(".popup__text");

sliderNext.addEventListener("click", () => {
  if (counterClickBtn === 25) {
    popup.style.backgroundImage = "url(../assets/img/act_2/die.jpg)";
    popupTitle.textContent = "Плохая концовка";
    popupText.textContent = "Вы умерли!";
    popup.classList.add("popup-active");
  }
  handleSliderChange();
  showInputDoor();
  showTextJornal();
  showprogress();
  changeNameBtn();
  console.log(counterClickBtn);
  console.log(counterImg);
});
//

const cardBox = document.querySelector(".card-box ");

const changeNameBtn = () => {
  if (counterClickBtn === 8) {
    sliderNext.textContent = "Осмотреть дом";
  } else if (counterClickBtn === 9) {
    sliderNext.textContent = "продолжить";
  } else if (counterClickBtn === 23) {
    sliderAct.textContent = "Принять таблетки";
    sliderNext.textContent = "Спуститься вниз";
  } else if (counterClickBtn === 24) {
    counterHeart -= 5;
    showHeart(counterHeart);
    sliderNext.textContent = "Ничего не делать";
  } else if (counterClickBtn === 25) {
    counterHeart -= 50;
    showHeart(counterHeart);
    sliderNext.textContent = "Ничего не делать";
  } else if (counterClickBtn === 28) {
    slider.classList.add("slider-inactive");
    cardBox.classList.add("card-box-active");
    task__two();
  }
};

sliderAct.addEventListener("click", () => {
  if (counterClickBtn >= 23) {
    counterClickBtn = 25;
    counterImg = 12;
    handleSliderChange();
    showprogress();
    sliderNext.textContent = "Отбиться";
    sliderAct.classList.add("slider-Act-inactive");
  } else if (counterClickBtn <= 22) {
    popup.classList.add("popup-active");
  }
});

//первый квест
const inputBox = document.querySelector(".input-box");
const inputDoor = document.querySelector(".input-door");

const showInputDoor = () => {
  if (counterClickBtn === 6) {
    inputBox.classList.add("input-box-active");
    sliderNext.textContent = "Ввести код";
    startTaskOne();
  }
};

//
const startTaskOne = () => {
  if (inputDoor.value === "vriend") {
    handleSliderChange();
    sliderNext.textContent = "Войти внутрь";
    inputBox.classList.remove("input-box-active");
  } else if (inputDoor.value.length !== 0) {
    counterClickBtn = 5;
    counterImg -= 1;
    inputDoor.value = "";
    inputDoor.setAttribute("placeholder", "не угадал");
  } else {
    counterClickBtn = 5;
    counterImg -= 1;
  }
};
//

//Пройденный прогресс
const boxIndicatorsProgress = document.querySelector(
  ".box-indicators__progress"
);

const showprogress = () => {
  let progress = (counterClickBtn / paragraph.length) * 100;
  boxIndicatorsProgress.textContent = `Пройденный прогресс: ${progress.toFixed()}%`;
};
//

//Журнал
const journal = document.querySelector(".journal");
let dellRepeat = 0;

const showTextJornal = () => {
  if (dellRepeat !== counterClickBtn) {
    let text = paragraph[counterClickBtn - 1];
    dellRepeat = counterClickBtn;
    journal.insertAdjacentHTML("beforeend", `<p>${text}</p>`);
  }
};

btnHistory.addEventListener("click", () => {
  journal.classList.toggle("journal-active");
});

//

const boxIindicatorsHeart = document.querySelector(".box-indicators__heart");

const showHeart = (counterHeart) => {
  boxIindicatorsHeart.textContent = `Количество жизней:${counterHeart}%`;
};

cardBox.addEventListener("click", () => {});

const randomNums = () => {
  let num = 0;
  let flag = true;
  while (flag) {
    num = (Math.random() * 10).toFixed();
    if (num < 9) {
      flag = false;
    }
  }
  return num;
};

let timeCardBox = [];
const getCardBox = () => {
  let counterTime = 0;
  let intervall = 500;
  let counterHit = 20;
  for (let index = 0; index < counterHit; index++) {
    let randomNum = randomNums();
    timeCardBox.push([counterTime, counterTime + intervall, randomNum]);
    counterTime += intervall;
  }
};
getCardBox();
console.log(timeCardBox);

const task__two = () => {
  timeCardBox.forEach(([a, b, c]) => {
    setTimeout(() => {
      cardBox.children[c].classList.add("card-box__card-active");
    }, a);
    setTimeout(() => {
      cardBox.children[c].classList.remove("card-box__card-active");
    }, b);
  });
};
