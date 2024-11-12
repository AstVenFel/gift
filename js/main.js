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
  if (counterClickBtn === 0) {
    document.querySelector(".header__title").style.display = "none";
  }
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
  if (counterClickBtn === 40) {
    wrapper.style.backgroundImage = `url(${img[21]})`;
  }
  if (counterClickBtn === 42) {
    popup.style.backgroundImage = "url(./assets/img/act_3/win.jpeg)";
    popupTitle.textContent = "Хорошая концовка";
    popupText.textContent = "Вы отправляетесь на встречу приключениям!";
    popup.classList.add("popup-active");
  }
  if (counterClickBtn === 42) {
    stopPlay(soundForest);
    playSound(soundWingame);
  }

  handleSliderChange();
  showInputDoor();
  showTextJornal();
  showprogress();
  changeNameBtn();
  getSound();
  console.log(counterClickBtn);
  console.log(counterImg);
});
//
const soundEndgame = document.querySelector(".sound-endgame");
const soundHoror = document.querySelector(".sound-horor");
const soundSpace = document.querySelector(".sound-space");
const soundGrowl = document.querySelector(".sound-growl");
//концовка смерти
const showYouLoose = () => {
  popup.style.backgroundImage = "url(./assets/img/act_2/die.jpg)";
  popupTitle.textContent = "Плохая концовка";
  popupText.textContent = "Вы умерли!";
  popup.classList.add("popup-active");
  playSound(soundEndgame);
  stopPlay(soundHoror);
  stopPlay(soundSpace);
  stopPlay(soundGrowl);
};
//

const cardBox = document.querySelector(".card-box ");
const playingField = document.querySelector(".playing-Field");

const changeNameBtn = () => {
  if (counterClickBtn === 8) {
    sliderNext.textContent = "Осмотреть дом";
  } else if (counterClickBtn === 9) {
    sliderNext.textContent = "продолжить";
  } else if (counterClickBtn === 22) {
    wrapper.classList.add("wrapper-filter");
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
  } else if (counterClickBtn === 42) {
    sliderNext.textContent = "Конец";
  }
};

const soundEndgameNeitro = document.querySelector(".sound-endgameNeitro");
const soundMainActOne = document.querySelector(".sound-mainAct_One");
sliderAct.addEventListener("click", () => {
  if (counterClickBtn === 2) {
    playSound(soundMainActOne);
  }
  if (counterClickBtn === 29) {
    sliderNext.textContent = "Продолжить";
    sliderAct.classList.add("slider-Act-inactive");
    handleSliderChange();
    showprogress();
    playSoundQuick();
    stopHororPlayEmpty();
  }
  if ((counterClickBtn >= 23) & (counterClickBtn < 29)) {
    playSoundQuick();
    counterClickBtn = 25;
    counterImg = 12;
    handleSliderChange();
    showprogress();
    sliderNext.textContent = "Отбиться";
    sliderAct.classList.add("slider-Act-inactive");
    wrapper.classList.remove("wrapper-filter");
  } else if (counterClickBtn <= 22) {
    popup.classList.add("popup-active");
    stopPlay(soundMainActOne);
    playSound(soundEndgameNeitro);
  }
  getSound();
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
    playSoundOpenDoor();
    sliderNext.textContent = "Войти внутрь";
    inputBox.classList.remove("input-box-active");
  } else if (inputDoor.value.length !== 0) {
    counterClickBtn = 5;
    counterImg -= 1;
    inputDoor.value = "";
    inputDoor.setAttribute("placeholder", "не угадал");
    playSoundCloseDoor();
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
      playSoundHit();
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
const soundRight = document.querySelector(".sound-right");
const soundLoose = document.querySelector(".sound-loose");
//Проверка ответа
const checkAnswer = (answer, question) => {
  if (answer.value === answerSky[question][0]) {
    changeSkillCard(answerSky, question);
    playSound(soundRight);
  } else {
    answer.value = answerSky[question][0];
    playSound(soundLoose);
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
const soundSword = document.querySelector(".sound-sword");

playingFieldBtnGame.addEventListener("click", () => {
  playSound(soundSword);
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
    counterClickBtn -= 1;
    counterImg -= 1;
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

//звуки первый акт
const soundTrain = document.querySelector(".sound-train");
const soundCar = document.querySelector(".sound-car");
const soundOpenDoor = document.querySelector(".sound-open-door");
const soundOpenZamokr = document.querySelector(".sound-open-zamok");
const soundBell = document.querySelector(".sound-bell");
const soundDrooperDoor = document.querySelector(".sound-drooper-door");
// звуки второй акт
const soundBook = document.querySelector(".sound-book");
const soundCreak = document.querySelector(".sound-creak");
const soundHit = document.querySelector(".sound-hit");
const soundQuick = document.querySelector(".sound-quick");
const soundHlam = document.querySelector(".sound-hlam");
const soundShagi = document.querySelector(".sound-shagi");
// звуки третий акт
const empty = document.querySelector(".empty");
const soundScream = document.querySelector(".sound-scream");
const soundBackfromspace = document.querySelector(".sound-backfromspace");
const soundForest = document.querySelector(".sound-forest");
const soundStepsForest = document.querySelector(".sound-stepsForest");
const soundKardio = document.querySelector(".sound-kardio");
const soundSstepsPlan = document.querySelector(".sound-stepsPlan");
const soundWingame = document.querySelector(".sound-wingame");

const getSound = () => {
  if (counterClickBtn === 2) {
    stopPlay(soundTrain);
    playSound(soundCar, 7);
  } else if (counterClickBtn === 4) {
    stopPlay(soundCar);
    playSound(soundBell);
  } else if (counterClickBtn === 5) {
    stopPlay(soundCar);
  } else if (counterClickBtn === 8) {
    stopPlay(soundOpenZamokr);
    playSound(soundOpenDoor);
  } else if (counterClickBtn === 9) {
    stopPlay(soundOpenDoor);
    playSound(soundCreak);
  } else if (counterClickBtn >= 12 && counterClickBtn <= 21) {
    stopPlay(soundCreak);
    playSound(soundBook);
  } else if (counterClickBtn === 22) {
    stopPlay(soundMainActOne);
    stopPlay(soundBook);
    playSound(soundHoror);
  } else if (counterClickBtn === 23) {
    playSound(soundHlam, 0, 0.8);
  } else if (counterClickBtn === 24) {
    stopPlay(soundHlam);
    playSound(soundHit);
    playSound(soundShagi, 0, 1);
  } else if (counterClickBtn === 25) {
    stopPlay(soundShagi);
    playSound(soundHit);
  } else if (counterClickBtn === 26) {
    stopPlay(soundShagi);
    setTimeout(playSound, 2000, soundGrowl);
  } else if (counterClickBtn === 32) {
    stopPlay(empty);
    playSound(soundSpace, 4, 0.2);
  } else if (counterClickBtn === 34) {
    setTimeout(playSound, 2000, soundScream);
  } else if (counterClickBtn === 38) {
    playSound(soundBackfromspace);
  } else if (counterClickBtn === 39) {
    stopPlay(soundSpace);
    playSound(soundKardio);
  } else if (counterClickBtn === 40) {
    stopPlay(soundKardio);
    playSound(soundForest);
    setTimeout(playSound, 2000, soundStepsForest);
  } else if (counterClickBtn === 41) {
    stopPlay(soundStepsForest);
    setTimeout(playSound, 1500, soundSstepsPlan);
    setTimeout(stopPlay, 4000, soundSstepsPlan);
  } else if (counterClickBtn === 43) {
    stopPlay(soundForest);
    playSound(soundWingame);
  }
};

function playSound(elem, time = 0, volume = 0.5) {
  elem.currentTime = time;
  elem.play();
  elem.volume = volume;
}
playSound(soundTrain);
playSound(soundMainActOne);
soundMainActOne.volume = 0.05;

function stopPlay(elem) {
  elem.pause();
  elem.currentTime = 0;
}

function playSoundOpenDoor() {
  soundOpenZamokr.currentTime = 0;
  soundOpenZamokr.play();
}
function playSoundCloseDoor() {
  soundDrooperDoor.currentTime = 0;
  soundDrooperDoor.play();
}

function playSoundHit() {
  soundHit.currentTime = 0;
  soundHit.play();
}
function playSoundQuick() {
  soundQuick.currentTime = 0;
  soundQuick.play();
}

function stopHororPlayEmpty() {
  soundHoror.pause();
  soundHoror.currentTime = 0;
  empty.currentTime = 0;
  empty.play();
}

//
