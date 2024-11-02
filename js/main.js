import { img, paragraph } from "./scenario.js";

const wrapper = document.querySelector(".wrapper");

//Смена картинок и диалогов
let counterClickBtn = 0;
let counterImg = 0;
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
    showYouLoose();
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

//концовка смерти
const showYouLoose = () => {
  popup.style.backgroundImage = "url(../assets/img/act_2/die.jpg)";
  popupTitle.textContent = "Плохая концовка";
  popupText.textContent = "Вы умерли!";
  popup.classList.add("popup-active");
};
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

//Второе задание
const timeGame = (timeEnd, intervall) => {
  let flag = false;
  let ckeck = setInterval(() => {
    cardBox.addEventListener("click", (e) => {
      if (e.target.className === "card-box__card card-box__card-active") {
        flag = true;
      }
    });
    if (flag === false) {
      counterHeart -= 10;
      showHeart(counterHeart);
    } else {
      flag = false;
    }
    if (counterHeart < 10) {
      clearInterval(ckeck);
      showYouLoose();
    }
  }, intervall);

  setTimeout(() => {
    clearInterval(ckeck);
    handleSliderChange();
    showTextJornal();
    showprogress();
    slider.classList.remove("slider-inactive");
    cardBox.classList.remove("card-box-active");
  }, timeEnd);
};

const randomNums = () => {
  let num = 0;
  let flag = true;
  while (flag) {
    num = (Math.random() * 10).toFixed(1) * 10;
    if (num < 16) {
      flag = false;
    }
  }
  return num;
};

let timeCardBox = [];
let counterTime = 0;
let intervall = 670;
let counterHit = 20;

const getCardBox = () => {
  for (let index = 0; index < counterHit; index++) {
    let randomNum = randomNums();
    timeCardBox.push([counterTime, counterTime + intervall, randomNum]);
    counterTime += intervall;
  }
};
getCardBox();

const task__two = () => {
  const timeEnd = intervall * counterHit;
  timeGame(timeEnd, intervall);
  timeCardBox.forEach(([a, b, c]) => {
    setTimeout(() => {
      cardBox.children[c].classList.add("card-box__card-active");
    }, a);
    setTimeout(() => {
      cardBox.children[c].classList.remove("card-box__card-active");
    }, b);
  });
};
//
