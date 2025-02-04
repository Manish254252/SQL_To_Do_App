const db = require("../config/db");


const createUserData = (userData, callback) => {
    const { username, firstName, lastName, email, gender, phone, address, dob, password } = userData;

    db.query(
        "INSERT INTO userData (username, firstName, lastName, email, gender, phone, address, dob, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [username, firstName, lastName, email, gender, phone, address, dob, password], // Make sure to hash the password here!
        callback
    );
};
module.exports = { createUserData};
