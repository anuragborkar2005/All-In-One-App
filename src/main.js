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

// Load tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Sidebar toggle
menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
    sidebar.classList.add("-translate-x-full");
  }
});

// Show/hide task input form
createTask.addEventListener("click", () => {
  taskInput.classList.toggle("hidden");
});

cancelTask.addEventListener("click", () => {
  taskInput.classList.toggle("hidden");
});

// Function to create and return a task element
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
    <div class="card-action p-4 flex justify-between items-center">
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

  return taskElement;
}

// Render all tasks in the list
function renderTasks() {
  tasksList.innerHTML = ""; // Clear existing tasks
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index);
    tasksList.appendChild(taskElement);
  });
}

// Mark a task as complete
function markComplete(index) {
  tasks[index].completed = true;
  saveTasks();
}

// Delete a task
function deleteTask(index) {
  console.log("Deleting at index: ", index);
  tasks.splice(index, 1);
  saveTasks();
}

// Format date into a readable string
function getDateFormat(date) {
  const d = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

// Save a new task
saveTask.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const date = taskDate.value.trim();

  if (title === "" || description === "" || date === "") {
    alert("All fields are required");
    return;
  }

  // Create a new task object
  const task = {
    title,
    description,
    date: getDateFormat(date),
    completed: false,
  };

  // Add the task to the tasks array
  tasks.push(task);

  // Clear the input fields
  taskTitle.value = "";
  taskDescription.value = "";
  taskDate.value = "";
  taskInput.classList.add("hidden");

  // Save the tasks and update the UI
  saveTasks();
});

// Save tasks to localStorage and render them
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(); // Ensure tasks are rendered after saving
}

// Initial render
renderTasks();
