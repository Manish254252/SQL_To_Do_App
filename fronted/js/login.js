let  taskList = [];
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({username, password}),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        sessionStorage.setItem("username", username);
        window.location.href = "home.html";
    } else {
        alert(data.message);
    }
});

exports.taskList = taskList;