
let user = null
async function checkAuth() {
    const response = await fetch("http://localhost:3000/auth/home", { credentials: "include" });
    const data = await response.json();
    user = data.user.username;
    if (response.ok) {
        console.log("inside login sucess")
        document.getElementById("welcomeMessage").innerText = `Hello, ${data.user.username}!`;
    } else {
        alert("Unauthorized access. Redirecting to login.");
        window.location.href = "index.html";
    }
}
checkAuth();

document.getElementById("logoutBtn").addEventListener("click", async function () {
    await fetch("http://localhost:3000/auth/logout", { method: "GET", credentials: "include" });
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
        newTaskItem.innerHTML = `<input class="form-check-input me-2" type="checkbox"> ${taskText} <button class="btn btn-danger btn-sm delete-task">Delete</button>`;
        todoList.appendChild(newTaskItem);
        newTaskInput.value = "";

        addDeleteEventListeners(); // Attach listeners to new delete buttons
    }

});



// To-Do List Code
async function addTaskInHome(newTaskInput) {
    // const taskText = newTaskInput.trim();
    console.log("Task text in addTaskHome:", newTaskInput);
    console.log("Task text in addTaskHome:", user);
    let username =user;
    let taskName = newTaskInput;

    if (newTaskInput !== "") {
        try {
            console.log("user in post call ", user)
            console.log("before post "+JSON.stringify({ user, newTaskInput }));
            const response = await fetch("http://localhost:3000/auth/addTask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, taskName }), // Removed Datetime for debugging
            });
            console.log("after post "+JSON.stringify({ user, newTaskInput }));

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
        });
    });
}

addDeleteEventListeners();
