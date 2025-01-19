const play = document.getElementById("play");
const flag = document.getElementById("get-time");
const reset = document.getElementById("reset");
const toggle = document.getElementById("toggle-play");
const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");

let startCount = 0;
let timerId;
let count = 0;

let startTimer = () => {
  timerId = setInterval(() => {
    document.getElementById("seconds").innerHTML = (startCount % 60)
      .toString()
      .padStart(2, "0");
    startCount++;
  }, 1000);
};

let stopTimer = () => {
  clearInterval(timerId);
};

let resetTimer = () => {
  startCount = 0;
  document.getElementById("seconds").innerHTML = "00";
  clearInterval(timerId);
};

let clearTimeList = () => {
  document.getElementById("time-list").innerHTML = "";
  count = 0;
};

play.addEventListener("click", () => {
  if (toggle.classList.contains("fa-play")) {
    toggle.classList.remove("fa-play");
    toggle.classList.add("fa-pause");
    startTimer();
  } else {
    toggle.classList.remove("fa-pause");
    toggle.classList.add("fa-play");
    stopTimer();
  }
});

reset.addEventListener("click", () => {
  resetTimer();
  if (toggle.classList.contains("fa-play")) {
    toggle.classList.remove("fa-play");
    toggle.classList.add("fa-pause");
    startTimer();
  } else {
    toggle.classList.remove("fa-pause");
    toggle.classList.add("fa-play");
    stopTimer();
  }
  clearTimeList();
});

flag.addEventListener("click", () => {
  let time = document.getElementById("seconds").innerHTML;
  let li = document.createElement("div");
  li.className = "w-full text-sm font-seminbold px-4 py-2";
  li.textContent = "Lap Count " + count + " : " + time;
  document.getElementById("time-list").appendChild(li);
  count++;
});

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});
