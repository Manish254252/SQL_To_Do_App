const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const path = require("path");
// require("dotenv").config();
console.log("DB_USER:", process.env.DB_USER); // Debugging


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:63342", credentials: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET || "default-secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use("/auth", authRoutes);

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
