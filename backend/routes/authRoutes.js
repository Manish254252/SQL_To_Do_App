const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/home", authController.getHome);
router.post("/createUser", authController.createUser);
router.post("/createUserData", authController.handleSignup);
router.post("/addTask", authController.AddTask);
// router.delete("/deleteTask", authController.deleteTask);

module.exports = router;
