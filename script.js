const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-btn");
const taskList = document.querySelector("#task-list");
const clearButton = document.querySelector("#clear-btn");

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    try {
        tasks = JSON.parse(savedTasks);
    } catch (error) {
        tasks = [];
        localStorage.removeItem("tasks");
    }
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(task) {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    li.append(taskText, deleteButton);

    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();

        li.remove();

        tasks = tasks.filter(function(item) {
            return item !== task;
        });

        saveTasks();
    });

    li.addEventListener("click", function() {
        li.classList.toggle("completed");
    });

    taskList.append(li);
}

function renderTasks() { 
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        createTask(task);
    });
}

renderTasks();

addButton.addEventListener("click", function() {
    const task = taskInput.value.trim();

    if (task === "") {
        return;
    }

    tasks.push(task);
    saveTasks();

    createTask(task);

    taskInput.value = "";
});

clearButton.addEventListener("click", function() {
    tasks = [];
    saveTasks();
    taskList.innerHTML = "";
});

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});
