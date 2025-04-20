// const express = require("express");
// const router = express.Router();
// const { loginForm, login, logout, registerForm, register, adminPage } = require("./controller");

// router.get("/login", loginForm);
// router.post("/login", login);
// router.get("/logout", logout);
// router.get("/register", registerForm);
// router.post("/register", register);
// router.get("/", adminPage);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { login, logout, register } = require("./controller"); // Use only the JSON response controllers

// Login route (POST)
router.post("/login", login);

// Register route (POST)
router.post("/register", register);

// Logout route (GET)
router.get("/logout", logout);

module.exports = router;

