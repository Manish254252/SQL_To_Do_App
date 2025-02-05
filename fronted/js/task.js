document.getElementById("logoutBtn").addEventListener("click", async function () {
    await fetch("http://localhost:3000/auth/logout", {method: "GET", credentials: "include"});
    window.location.href = "index.html";
});


const todoList = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task');
let addTaskButton = document.getElementById('add-task');

addTaskButton.addEventListener('click', async () => {
    const taskText = newTaskInput.value.trim();
    console.log("Task text eventListener:", taskText);
    let name = document.getElementById('welcomeMessage').innerText;
    console.log("from message name in eventListener:", name);
    await addTaskInHome(taskText)

    if (taskText !== "") {
        const newTaskItem = document.createElement('li');
        newTaskItem.innerHTML = `<input class="form-check-input me-2" type="checkbox"> ${taskText}`;
        todoList.appendChild(newTaskItem);
        newTaskInput.value = "";


        const checkbox = newTaskItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', updateDeleteButtonState);
        // addDeleteEventListeners();
       // Attach listeners to new delete buttons
    }

    updateDeleteButtonState();
});


// To-Do List Code
async function addTaskInHome(newTaskInput) {
    // const taskText = newTaskInput.trim();
    console.log("Task text in addTaskHome:", newTaskInput);
    console.log("Task text in addTaskHome:", user);
    let username = user;
    let taskName = newTaskInput;

    if (newTaskInput !== "") {
        try {
            console.log("user in post call ", user)
            console.log("before post " + JSON.stringify({user, newTaskInput}));
            const response = await fetch("http://localhost:3000/auth/addTask", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({username, taskName}), // Removed Datetime for debugging
            });
            console.log("after post " + JSON.stringify({user, newTaskInput}));

            if (!response.ok) {
                // Handle non-JSON errors
                const errorText = await response.text(); // Get error as text
                throw new Error(errorText || response.statusText); // Display error message
            }

            const data = await response.json(); // Now this should work if response is JSON

            console.log("Response data:", data); // Check the response from the server
            alert("Task added successfully!");

            // Update the to-do list with data from the server (recommended)
            // ...

        } catch (error) {
            console.error("Error adding task:", error);
            alert("Error adding task: " + error.message); // More informative error message
        }
    }

}

function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-task');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const listItem = button.parentNode;
            todoList.removeChild(listItem);
            updateDeleteButtonState()
        });
    });
}

addDeleteEventListeners();


async function addTaskFromDb() {
    // let nim = document.getElementById('welcomeMessage').innerText.trim();
    // nim=
    // console.log("Nim == " + nim)
    let username = sessionStorage.getItem('username')
    console.log("username", username);
    console.log("passing from here")
    const url = `http://localhost:3000/auth/getAllTask?username=${username}`;
    const response = await fetch(url,
        {
            credentials: "include",
            method: "GET",
        });
    const data = await response.json()
    console.log(data)
    console.log("passsing befor home page")
    let taskList = data.tasks;
    console.log(taskList)
    console.log("taskList in addTaskFromDb:", taskList);
    taskList.forEach(task => {
        const newTaskItem = document.createElement('li');
        newTaskItem.innerHTML = `<input class="form-check-input me-2" type="checkbox"> ${task.taskName}`;
        todoList.appendChild(newTaskItem);
        const checkbox = newTaskItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', updateDeleteButtonState);
    });

    addDeleteEventListeners(); // Attach listeners to new delete buttons
}

addTaskFromDb();


// const todoList = document.getElementById('todo-list');
const deleteSelectedButton = document.getElementById('delete-selected');

// Function to update the state of the delete button
function updateDeleteButtonState() {
    const checkedCheckboxes = todoList.querySelectorAll('input[type="checkbox"]:checked');
    deleteSelectedButton.disabled = checkedCheckboxes.length === 0;
}
deleteSelectedButton.addEventListener('click', () => {
    const checkedCheckboxes = todoList.querySelectorAll('input[type="checkbox"]:checked');
    checkedCheckboxes.forEach(checkbox => {
        let taskStr= checkbox.nextSibling.textContent.trim();
        deleteTaskFromDb(taskStr, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
        })
        const listItem = checkbox.parentNode;
        todoList.removeChild(listItem);
    });

    updateDeleteButtonState(); // Update the state after deleting tasks
});


async function deleteTaskFromDb(taskName) {
    let username = sessionStorage.getItem('username')
    console.log("username", username);
    console.log("task", taskName);
    console.log("passing from here")
    const url = `http://localhost:3000/auth/deleteTask`;
    const response = await fetch(url,
        {
            credentials: "include",
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, taskName}),
        });
    const data = await response.json()
    console.log(data)


    addDeleteEventListeners(); // Attach listeners to new delete buttons
}