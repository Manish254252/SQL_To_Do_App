const db = require("../config/db");


const createTask = (username,taskName, callback) => {
    // const { username, firstName, lastName, email, gender, phone, address, dob, password } = userData;

    db.query(
        "INSERT INTO task ( username,taskName) VALUES (?, ?)",
        [ username,taskName], // Make sure to hash the password here!
        callback
    );
};

const findAllTask = (username, callback) => {
    // const { username, firstName, lastName, email, gender, phone, address, dob, password } = userData;
    console.log(username)
    db.query(
        "SELECT taskName FROM task WHERE username = ?",
        [username],callback
    );
};


const deleteTask = (username,taskName, callback) => {
    console.log("in model")
    console.log(username,taskName)
    db.query(
        "DELETE  FROM task WHERE username = ? AND taskName = ?",
        [username,taskName],callback
    );
};
module.exports = { createTask,findAllTask,deleteTask};
