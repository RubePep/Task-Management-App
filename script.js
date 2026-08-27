// Retrieve task management from the local storage or initialize an empty array

let taskmanagement = JSON.parse(localStorage.getItem("taskmanagement")) || [];
const taskmanagementInput = document.getElementById("taskmanagementInput");
const taskmanagementList = document.getElementById("taskmanagementList");
const taskmanagementCount = document.getElementById("taskmanagementCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize our task management app

document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    taskmanagementInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter ") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    const newTask = taskmanagementInput.value.trim();
    if (newTask !== "") {
        taskmanagement.push({
            text: newTask, disabled: false,
        });
        saveToLocalStorage();
        taskmanagementInput.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
    console.log("test");
}

function displayTasks() {
    taskmanagementList.innerHTML = "";
    taskmanagement.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
           <div class="taskmanagement-container">
               <input type="checkbox" class="taskmanagement-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
           <p id="taskmanagement-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
           </div>
        `;
        p.querySelector(".taskmanagement-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        taskmanagementList.appendChild(p);
    });
    taskmanagementCount.textContent = taskmanagement.length;
}

function editTask(index) {
    const taskmanagementItem = document.getElementById(`taskmanagement-${index}`);
    const existingText = taskmanagement[index].text;
    const inputElement = document.createElement("input")

    inputElement.value = existingText;
    taskmanagementItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            taskmanagement[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

function toggleTask(index) {
    taskmanagement[index].disabled = !taskmanagement[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    taskmanagement = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("taskmanagement", JSON.stringify(taskmanagement));
}