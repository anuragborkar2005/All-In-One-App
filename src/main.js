const createTask = document.getElementById("create-new-task");
const taskInput = document.getElementById("task-input");
const cancelTask = document.getElementById("cancel-task");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDate = document.getElementById("task-datetime");
const saveTask = document.getElementById("save-task");
const tasksList = document.getElementById("tasks-list");
const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");

let notifyRequest = false;

Notification.requestPermission().then((result) => {
  notifyRequest = result;
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});

createTask.addEventListener("click", () => {
  taskInput.classList.toggle("hidden");
});

cancelTask.addEventListener("click", () => {
  taskInput.classList.toggle("hidden");
});

function renderTask() {
  tasksList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add(
      "bg-white",
      "shadow-lg",
      "rounded-lg",
      "px-4",
      "overflow-hidden",
      "py-2",
      "w-80",
      "h-56"
    );
    taskElement.innerHTML = `
    <div class="card-title p-4 w-96 h-72 rounded-xl">
    <h4 class="text-sm font-semibold">${task.title}</h4>
    <span class="text-xs text-gray-500">${task.date}</span>
    </div>
    <div class="px-4">
        <p class="card-content text-xs font-normal text-gray-700">${
          task.description
        }</p>
    </div>
    <div class="card-action p-4 flex h-36 gap-x-2">
        <button id="mark-complete" onclick="markComplete(${index})" class="text-white text-xs mr-2  px-2 py-1 right-0 bg-indigo-600 hover:bg-indigo-700 p-4 rounded-md"><i class="fa-solid fa-check mr-2"></i> ${
      task.completed ? "Completed" : "Mark as Complete"
    }</button>
        <button id="delete-task" onclick="deleteTask(${index})" class="text-white text-xs ml-2 px-2  py-1 right-0 bg-indigo-600 hover:bg-indigo-700 p-4 rounded-md"><i class="fa-solid fa-trash mr-2"></i> Delete</button>
    </div>
`;
    tasksList.appendChild(taskElement);
  });
}

function markComplete(index) {
  tasks[index].completed = true;
  saveTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

renderTask();

function getDateFormat(date) {
  let d = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(d);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask();
}

saveTask.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const date = taskDate.value.trim();
  if (title === "" || description === "" || date === "") {
    alert("All fields are required");
    return;
  } else {
    const task = {
      title: title,
      description: description,
      date: getDateFormat(date),
      completed: false,
    };
    tasks.push(task);
    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    saveTasks();
    taskInput.classList.toggle("hidden");
  }

  if (notifyRequest === "granted") {
    const notification = new Notification("Task Created", {
      body: `Task ${title} has been created`,
    });

    notification.addEventListener("click", () => {
      window.focus();
    });
  }
});
