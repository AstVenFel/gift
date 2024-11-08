import { img, paragraph, answerSky } from "./scenario.js";

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
  if (counterClickBtn === 29) {
    showYouLoose();
  }
  if (counterClickBtn === 35) {
    slider.classList.add("slider-inactive");
    playingField.classList.add("playing-Field-active");
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
const playingField = document.querySelector(".playing-Field");

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
    sliderNext.textContent = "Сопротивляться";
    sliderAct.classList.remove("slider-Act-inactive");
    sliderAct.textContent = "Принять таблетки";
  } else if (counterClickBtn === 36) {
    slider.classList.add("slider-inactive");
    playingField.classList.add("playing-Field-active");
  }
};

sliderAct.addEventListener("click", () => {
  if (counterClickBtn === 29) {
    sliderNext.textContent = "Продолжить";
    sliderAct.classList.add("slider-Act-inactive");
    handleSliderChange();
    showprogress();
  }
  if ((counterClickBtn >= 23) & (counterClickBtn < 29)) {
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
  if (inputDoor.value.toLowerCase() === "vriend") {
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
let intervall = 800;
let counterHit = 10;

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

//третий таск

//Раскидываем вопросы и скиллы
const arrAnswerSky = Object.entries(answerSky);

const cardQuestion = document.querySelectorAll(".card__question");
const cardHeart = document.querySelectorAll(".card__heart");
const cardAttack = document.querySelectorAll(".card__attack");
const cardHealing = document.querySelectorAll(".card__healing");

const addQuestion = (cardQuestion, arrAnswerSky) => {
  for (let index = 0; index < cardQuestion.length; index++) {
    cardQuestion[index].textContent = arrAnswerSky[index][0];
    cardHeart[index].textContent = arrAnswerSky[index][1][1];
    cardAttack[index].textContent = arrAnswerSky[index][1][2];
    cardHealing[index].textContent = arrAnswerSky[index][1][3];
  }
};

addQuestion(cardQuestion, arrAnswerSky);
//

const playingFieldUser = document.querySelector(".playing-Field__user");
const playingFieldCard = document.querySelectorAll(".playing-Field__card");

playingFieldUser.addEventListener("click", (e) => {
  getAnswer(e);
  showQuestion(e);
});

let answer = "";
let question = "";

const showQuestion = (e) => {
  if (
    e.target.className === "card__btn" &&
    e.target.textContent === "Выбрать"
  ) {
    e.target.textContent = "Ответить";
    question = e.target.parentNode.childNodes[3].textContent;
    e.target.parentNode.childNodes[3].classList.add("card__question-active");
    e.target.parentNode.classList.add("playing-Field__card-active");
    disableСards();
  }
};

let counterMove = -1;
//Получить ответ
const getAnswer = (e) => {
  if (
    e.target.className === "card__btn" &&
    e.target.textContent === "Ответить"
  ) {
    counterMove += 1;
    answer = e.target.parentNode.childNodes[5];
    checkAnswer(answer, question);
    e.target.parentNode.classList.add("playing-Field__card-permoment-inactive");
    showCardEnemy(arrAnswerSky, counterMove);
    playingFieldBtnGame.classList.remove("playing-Field__btn-game-inactive");
  }
};
//

//Проверка ответа
const checkAnswer = (answer, question) => {
  if (answer.value === answerSky[question][0]) {
    changeSkillCard(answerSky, question);
    // playSoundRight();
  } else {
    answer.value = answerSky[question][0];
    // playSoundEroro();
  }
};
//

//Меняем данные карты боя
const cardSkillUser = document.querySelectorAll(".card__skill-user");
const cardImgUser = document.querySelector(".card__img-user");

const changeSkillCard = (answerSky, question) => {
  cardSkillUser[0].textContent = answerSky[question][1];
  cardSkillUser[1].textContent = answerSky[question][2];
  cardSkillUser[2].textContent = answerSky[question][3];
  cardImgUser.src = answerSky[question][4];
};
//

//вырубаем лишние карты
const disableСards = () => {
  playingFieldCard.forEach((element) => {
    if (element.className === "playing-Field__card")
      element.classList.add("playing-Field__card-inactive");
  });
};
//

//Показываем карту противника
const mixArray = (arrAnswerSky) => {
  for (let i = arrAnswerSky.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrAnswerSky[i], arrAnswerSky[j]] = [arrAnswerSky[j], arrAnswerSky[i]];
  }
  return arrAnswerSky;
};

mixArray(arrAnswerSky);

const cardImgEnemy = document.querySelector(".card__img-enemy");
const cardSkillEnemy = document.querySelectorAll(".card__skill-enemy");
const showCardEnemy = (arrAnswerSky, counterMove) => {
  cardSkillEnemy[0].textContent = arrAnswerSky[counterMove][1][1];
  cardSkillEnemy[1].textContent = arrAnswerSky[counterMove][1][2];
  cardSkillEnemy[2].textContent = arrAnswerSky[counterMove][1][3];
  cardImgEnemy.src = arrAnswerSky[counterMove][1][4];
};
//

//Начать бой
const playingFieldBtnGame = document.querySelector(".playing-Field__btn-game");

playingFieldBtnGame.addEventListener("click", () => {
  if (cardSkillEnemy[0].textContent != 0) {
    startFight();
  }
  removeInactive();
  if (counterMove === 10) {
    slider.classList.remove("slider-inactive");
    playingField.classList.remove("playing-Field-active");
    counterClickBtn = 35;
    counterImg -= 1;
    handleSliderChange();
    showTextJornal();
    showprogress();
    // playSoundWin();
    // showYouWin(userName);
  }
});

let counterHeartEnemy = 100;
const playingFieldEnemyHeart = document.querySelector(
  ".playing-Field__enemy-heart"
);

const startFight = () => {
  let damageEnemy =
    cardSkillEnemy[0].textContent - cardSkillUser[1].textContent;
  let damageUser = cardSkillUser[0].textContent - cardSkillEnemy[1].textContent;
  let therapyUser = cardSkillUser[2].textContent;
  let therapyEnemy = cardSkillEnemy[2].textContent;
  if (damageUser < 0) {
    counterHeart -= Math.abs(damageUser);
    showHeart(counterHeart);
  }

  if (damageEnemy < 0) {
    counterHeartEnemy -= Math.abs(damageEnemy);
    playingFieldEnemyHeart.textContent = `Количество жизней Демиурга: ${counterHeartEnemy}`;
  }
  playingFieldBtnGame.classList.add("playing-Field__btn-game-inactive");

  addHeartUser(therapyUser);
  addHearEnemy(therapyEnemy);

  if (counterHeartEnemy <= 0) {
    slider.classList.remove("slider-inactive");
    playingField.classList.remove("playing-Field-active");
    handleSliderChange();
    showTextJornal();
    showprogress();
  }
  if (counterHeart <= 0) {
    showYouLoose();
  }

  removeOldCard();
};
//

//Лечим юзера
const addHeartUser = (therapyUser) => {
  counterHeart += Number(therapyUser);
  if (counterHeart > 100) {
    counterHeart = 100;
  }
  showHeart(counterHeart);
};
//

//Лечим врага
const addHearEnemy = (therapyEnemy) => {
  counterHeartEnemy += Number(therapyEnemy);
  if (counterHeartEnemy > 100) {
    counterHeartEnemy = 100;
  }
  playingFieldEnemyHeart.textContent = `Количество жизней Демиурга: ${counterHeartEnemy}%`;
};
//

//снять деактивацию с карт
const removeInactive = () => {
  playingFieldCard.forEach((element) => {
    element.classList.remove("playing-Field__card-inactive");
  });
};

//

//Обнулить картинкуи скиллы сыгранных карт
const removeOldCard = () => {
  cardImgUser.src = "./assets/svg/sky/null.svg";
  cardImgEnemy.src = "./assets/svg/sky/null.svg";
  cardSkillUser[0].textContent = 0;
  cardSkillUser[1].textContent = 0;
  cardSkillUser[2].textContent = 0;
  cardSkillEnemy[0].textContent = 0;
  cardSkillEnemy[1].textContent = 0;
  cardSkillEnemy[2].textContent = 0;
};

//
