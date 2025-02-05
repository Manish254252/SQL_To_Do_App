const API_BASE_URL = "http://localhost:3000/auth";




/**
 * Login API
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} Response data from server
 */
async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        });

        return await response.json();
    } catch (error) {
        console.error("Login failed:", error);
        return { message: "Login request failed" };
    }
}





/**
 * Logs out the user
 */
async function logoutUser() {
    await fetch(`${API_BASE_URL}/logout`, { method: "GET", credentials: "include" })
    sessionStorage.removeItem("username");
    window.location.href = "index.html";
}

/**
 * Adds a new task to the database
 * @param {string} taskName - The name of the task
 */
async function addTaskToDb(taskName) {
    let username = sessionStorage.getItem("username");

    if (!taskName.trim()) return;

    try {
        const response = await fetch(`${API_BASE_URL}/addTask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, taskName }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || response.statusText);
        }

        const data = await response.json();
        console.log("Task added:", data);
        return data;
    } catch (error) {
        console.error("Error adding task:", error);
        alert("Error adding task: " + error.message);
    }
}

/**
 * Fetches all tasks for the logged-in user
 */
async function getAllTasksFromDb() {
    let username = sessionStorage.getItem("username");

    try {
        const response = await fetch(`${API_BASE_URL}/getAllTask?username=${username}`, {
            credentials: "include",
            method: "GET",
        });

        const data = await response.json();
        console.log("Fetched tasks:", data.tasks);
        return data.tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

/**
 * Deletes a task from the database
 * @param {string} taskName - The task to delete
 */
async function deleteTaskFromDb(taskName) {
    let username = sessionStorage.getItem("username");

    try {
        const response = await fetch(`${API_BASE_URL}/deleteTask`, {
            credentials: "include",
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, taskName }),
        });

        const data = await response.json();
        console.log("Task deleted:", data);
        return data;
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// Export all functions for use in other scripts
export { logoutUser, addTaskToDb, getAllTasksFromDb, deleteTaskFromDb,loginUser };
