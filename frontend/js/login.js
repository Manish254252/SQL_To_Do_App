// let  taskList = [];
import {loginUser} from "../api/api.js";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

  let  data = await loginUser(username, password)
    console.log(data)
    if (data.user) {

        showPopupMessage(data.message,true)
        sessionStorage.setItem("username", username);

        window.location.href = "home.html";
    } else {
        alert(data.message);
    }
});

function showPopupMessage(message, isSuccess) {
    const popup = document.getElementById("login-popup");
    popup.innerText = message;
    popup.className = isSuccess ? "success" : "error";
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // Hide after 2 seconds
}
