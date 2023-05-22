var player0 = document.querySelector(".player--0");
var player1 = document.querySelector(".player--1");

var btnYangiUyin = document.querySelector(".btn--new");
var btnTowTawlaw = document.querySelector(".btn--roll");
var btnSaqlash = document.querySelector(".btn--hold");

var kubik = document.querySelector(".dice");

let xozirgiBall = 0,
  activeUser = 0,
  umumiyBall = [0, 0];

const showCurrentScore = () => {
  document.getElementById("current--" + activeUser).textContent = xozirgiBall;
};
const changeActiveUser = () => {
  activeUser = activeUser == 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
const disabledTrue = () => {
  btnSaqlash.style.cursor = "not-allowed";
  btnSaqlash.setAttribute("disabled", true);
  btnTowTawlaw.style.cursor = "not-allowed";
  btnTowTawlaw.setAttribute("disabled", true);
};
const disabledFalse = () => {
  btnSaqlash.style.cursor = "pointer";
  btnSaqlash.removeAttribute("disabled");
  btnTowTawlaw.style.cursor = "pointer";
  btnTowTawlaw.removeAttribute("disabled");
};

btnTowTawlaw.addEventListener("click", () => {
  var randomNumber = Math.trunc(Math.random() * 60) + 1;
  kubik.classList.remove("hidden");
  kubik.src = "dice/dice-" + randomNumber + ".png";

  if (randomNumber !== 1) {
    xozirgiBall += randomNumber;
    showCurrentScore();
  } else {
    xozirgiBall = 0;
    showCurrentScore();

    changeActiveUser();
  }
});

btnSaqlash.addEventListener("click", () => {
  kubik.classList.add("hidden");
  umumiyBall[activeUser] += xozirgiBall;
  xozirgiBall = 0;
  document.getElementById("score--" + activeUser).textContent =
    umumiyBall[activeUser];
  document.getElementById("current--" + activeUser).textContent = xozirgiBall;

  if (umumiyBall[activeUser] >= 100) {
    var win = document.querySelector(".player--" + activeUser);
    win.classList.add("player--winner");
    document.getElementById("score--" + activeUser).textContent = "You win";
    disabledTrue();
  }
  changeActiveUser();
});

btnYangiUyin.addEventListener("click", () => {
  umumiyBall = [0, 0];
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  xozirgiBall = 0;
  showCurrentScore();

  if (activeUser == 1) {
    activeUser = 0;
  }
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  disabledFalse();
});
