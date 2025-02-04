
const bcrypt = require("bcryptjs");
const { findUserByUsername, createUsername, createUserData } = require("../models/userModel");
const {createTask, findAllTask} = require("../models/taskModel");

// Helper function for hashing passwords
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject("Password hashing error");
            }
            resolve(hash);
        });
    });
}

// Helper function to handle user creation
function createUser(username, hash, res) {
    createUsername(username, hash, (err, results) => {
        if (err) {
            console.error("Error creating user:", err);
            if (err.code === 'ER_DUP_ENTRY') { // Check for duplicate entry error
                return res.status(400).json({ error: "Username already exists" });
            }
            return res.status(500).json({ error: "User creation failed" });
        }
        res.json({ message: "User created successfully" });
    });
}

// Login logic
exports.login = (req, res) => {
    const { username, password } = req.body;
    findUserByUsername(username, (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching user" });

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Error verifying password" });
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            req.session.user = { id: results[0].id, username: results[0].username };
            // Storage.sessionStorage.setItem("username",results[0].username)
            // sessionStorage.setItem(username,results[0].username)
            res.json({ message: "Login successful", user: req.session.user });
        });
    });
};

// Logout logic
exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out successfully" });
};

// Get home page logic
exports.getHome = (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
    res.json({ message: "Welcome to Home Page", user: req.session.user });
};

// Create user logic (signup)
exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        createUser(username, hashedPassword, res);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error });
    }
};

// Handle signup
exports.handleSignup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        createUser(username, hashedPassword, res);

        // Additional user data creation logic (if required)
        const userData = req.body; // Get user data from the request body
        createUserData(userData, (err, results) => {
            if (err) {
                console.error("Error creating user:", err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Username or email already exists" });
                }
                return res.status(500).json({ error: "User creation failed" });
            }
            res.status(201).json({ message: "User created successfully" });
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: error });
    }
};

// Add task logic
exports.AddTask = (req, res) => {
    const { username, taskName } = req.body;
    createTask(username, taskName, (err, results) => {
        if (err) {
            console.error("Error creating task:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "Username or email already exists" });
            }
            return res.status(500).json({ error: "Task creation failed" });
        }
        res.status(201).json({ message: "Task created successfully" });
    });
};

exports.getAllTask= (req, res) => {
    const  username = req.query.username;
    console.log("get all task in authcontroller"+username)
    findAllTask(username, (err, results) => {
        if (err) {
            console.error("Error fetching tasks:", err);
            console.log(results)
            return res.status(500).json({ error: "Error fetching tasks" });
        }
        res.json({ message: "Tasks fetched successfully", tasks: results });
    });
}