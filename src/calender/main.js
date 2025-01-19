const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");

// Get Current Year and Month
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.getElementById("month").textContent =
  month[currentMonth] + " " + currentYear;

// Calculate Total Days in Month
function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Get Starting Day of the Month
function getStartDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

// Generating a Calendar
function generateCalendar(month, year) {
  const daysInMonth = getDaysInMonth(month, year);
  const start = getStartDayOfMonth(month, year);

  const calendar = [];
  // Add Empty Cells for days before list
  for (let i = 0; i < start; i++) {
    calendar.push(null);
  }
  // Adding Days of the Months
  for (let day = 1; day <= daysInMonth; day++) {
    calendar.push(day);
  }

  return calendar;
}

// Rendering Calendar in Rows
function renderCalendarGrid(calendar) {
  const weeks = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }
  return weeks;
}

// Rendering A Calendar
function renderCalendar(weeks) {
  const calendarGrid = document.getElementById("calendar-grid");
  calendarGrid.innerHTML = ""; // Clear Previous Calendar
  weeks.forEach((week) => {
    week.forEach((day) => {
      const dayCell = document.createElement("div");
      dayCell.className = "py-2 text-center rounded-full hover:bg-blue-200";
      dayCell.textContent = day;
      calendarGrid.appendChild(dayCell);
    });
  });
}

const weeks = renderCalendarGrid(generateCalendar(currentMonth, currentYear));
renderCalendar(weeks);

document.querySelector("#prev").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  document.getElementById("month").textContent =
    month[currentMonth] + " " + currentYear;

  const weeks = renderCalendarGrid(generateCalendar(currentMonth, currentYear));
  renderCalendar(weeks);
});

document.querySelector("#next").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  document.getElementById("month").textContent =
    month[currentMonth] + " " + currentYear;

  const weeks = renderCalendarGrid(generateCalendar(currentMonth, currentYear));
  renderCalendar(weeks);
});

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});
