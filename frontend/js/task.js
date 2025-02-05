// const { logoutUser, addTaskToDb, getAllTasksFromDb, deleteTaskFromDb } =require( "../../backend/api/api.js");

// Logout button event
import {addTaskToDb, deleteTaskFromDb, getAllTasksFromDb, logoutUser} from "../api/api.js";

document.getElementById("logoutBtn").addEventListener("click", logoutUser);

// To-Do List Elements
const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");

// Add Task Button Click Event
addTaskButton.addEventListener("click", async () => {
    const taskText = newTaskInput.value.trim();
    if (!taskText) return;

    console.log("Adding task:", taskText);
    await addTaskToDb(taskText);

    const newTaskItem = document.createElement("li");
    newTaskItem.innerHTML = `<input class="form-check-input me-2" type="checkbox"> ${taskText}`;
    todoList.appendChild(newTaskItem);
    newTaskInput.value = "";

    const checkbox = newTaskItem.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", updateDeleteButtonState);
    updateDeleteButtonState();
});

// Load tasks from DB on page load
async function loadTasks() {
    const tasks = await getAllTasksFromDb();
    tasks.forEach((task) => {
        const newTaskItem = document.createElement("li");
        newTaskItem.innerHTML = `<input class="form-check-input me-2" type="checkbox"> ${task.taskName}`;
        todoList.appendChild(newTaskItem);

        const checkbox = newTaskItem.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", updateDeleteButtonState);
    });



    addDeleteEventListeners();
}
function addDeleteEventListeners() {
    const checkboxes = todoList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateDeleteButtonState);
    });
}
// Call on page load
loadTasks();

// Update Delete Button State
function updateDeleteButtonState() {
    const checkedCheckboxes = todoList.querySelectorAll("input[type='checkbox']:checked");
    document.getElementById("delete-selected").disabled = checkedCheckboxes.length === 0;
}

// Delete Selected Tasks
document.getElementById("delete-selected").addEventListener("click", async () => {
    const checkedCheckboxes = todoList.querySelectorAll("input[type='checkbox']:checked");

    for (const checkbox of checkedCheckboxes) {
        const taskName = checkbox.nextSibling.textContent.trim();
        await deleteTaskFromDb(taskName);

        const listItem = checkbox.parentNode;
        todoList.removeChild(listItem);
    }

    updateDeleteButtonState();
});
