const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");

let currentTime = () => {
  let time = new Date().toLocaleTimeString();
  document.getElementById("time").innerHTML = `<h1>${time.toUpperCase()}</h1>`;
};

currentTime();
setInterval(() => {
  currentTime();
}, 1000);

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});
