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

function createTaskElement(task, index) {
  const taskElement = document.createElement("div");
  taskElement.classList.add(
    "bg-white",
    "shadow-lg",
    "rounded-lg",
    "px-4",
    "overflow-hidden",
    "py-2",
    "w-full",
    "lg:w-80",
    "h-auto"
  );

  taskElement.innerHTML = `
    <div class="card-title p-4">
      <h4 class="text-sm font-semibold">${task.title}</h4>
      <span class="text-xs text-gray-500">${task.date}</span>
    </div>
    <div class="px-4">
      <p class="card-content text-xs font-normal text-gray-700">${
        task.description
      }</p>
    </div>
    <div class="card-action p-4 flex gap-x-2">
      <button class="mark-complete text-white text-xs px-3 py-2 mr-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">
        <i class="fa-solid fa-check mr-2"></i>${
          task.completed ? "Completed" : "Mark as Complete"
        }
      </button>
      <button class="delete-task text-white text-xs px-3 py-2 ml-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">
        <i class="fa-solid fa-trash mr-2"></i>Delete
      </button>
    </div>
  `;

  const markCompleteBtn = taskElement.querySelector(".mark-complete");
  const deleteTaskBtn = taskElement.querySelector(".delete-task");

  markCompleteBtn.addEventListener("click", () => markComplete(index));
  deleteTaskBtn.addEventListener("click", () => deleteTask(index));

  return taskElement;
}

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
      "w-full",
      "lg:w-80",
      "h-auto"
    );

    taskElement.innerHTML = `
      <div class="card-title p-4">
        <h4 class="text-sm font-semibold">${task.title}</h4>
        <span class="text-xs text-gray-500">${task.date}</span>
      </div>
      <div class="px-4">
        <p class="card-content text-xs font-normal text-gray-700">${
          task.description
        }</p>
      </div>
      <div class="card-action p-4 flex gap-x-2">
        <button class="mark-complete text-white text-xs px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">
          <i class="fa-solid fa-check mr-2"></i>${
            task.completed ? "Completed" : "Mark as Complete"
          }
        </button>
        <button class="delete-task text-white text-xs px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">
          <i class="fa-solid fa-trash mr-2"></i>Delete
        </button>
      </div>
    `;

    const markCompleteBtn = taskElement.querySelector(".mark-complete");
    const deleteTaskBtn = taskElement.querySelector(".delete-task");

    markCompleteBtn.addEventListener("click", () => markComplete(index));
    deleteTaskBtn.addEventListener("click", () => deleteTask(index));

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

saveTask.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const date = taskDate.value.trim();

  if (title === "" || description === "" || date === "") {
    alert("All fields are required");
    return;
  }

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

  if (notifyRequest === "granted") {
    const notification = new Notification("Task Created", {
      body: `Task "${title}" has been created`,
    });

    notification.addEventListener("click", () => {
      window.focus();
    });
  }
});

function saveTask(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
  renderTask();
}

renderTask();
