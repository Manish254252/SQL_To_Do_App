const db = require("../config/db");

const findUserByUsername = (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], callback);
};





const createUsername = (username, password,pwdText, callback) => {
    db.query("INSERT INTO users (username, password,pwdText) VALUES (?, ?,?)", [username, password,pwdText], callback);
};




const createUserData = (userData, callback) => {
    const { username, firstName, lastName, email, gender, phone, address, dob, password } = userData;

    db.query(
        "INSERT INTO userData (username, firstName, lastName, email, gender, phone, address, dob, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [username, firstName, lastName, email, gender, phone, address, dob, password], // Make sure to hash the password here!
        callback
    );
};


module.exports = { findUserByUsername, createUsername , createUserData};
