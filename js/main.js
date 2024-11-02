import { img, paragraph } from "./scenario.js";

const wrapper = document.querySelector(".wrapper");

//Смена картинок и диалогов
let counterClickBtn = 0;
let counterImg = 0;

const btnHistory = document.querySelector(".slider__btn-history");
const sliderNext = document.querySelector(".slider__next");
const sliderText = document.querySelector(".slider__text");

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

sliderNext.addEventListener("click", () => {
  handleSliderChange();
  showInputDoor();
  showTextJornal();
  showprogress();
});
//

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

const startTaskOne = () => {
  if (inputDoor.value === "vriend") {
    handleSliderChange("next");
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
