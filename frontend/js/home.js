
let user = null
async function checkAuth() {
    const response = await fetch("http://localhost:3000/auth/home", { credentials: "include" });
    const data = await response.json();
    user = data.user.username;
    if (response.ok) {
        console.log("inside login sucess")
        document.getElementById("welcomeMessage").innerText = `Hello, ${data.user.username}`;
    } else {
        alert("Unauthorized access. Redirecting to login.");
        window.location.href = "index.html";
    }
}
checkAuth();
