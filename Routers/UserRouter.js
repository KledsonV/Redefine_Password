const Router = require("express").Router();

const User = require("../Controllers/UserController");

// Middlewares
const checkToken = require("../Helpers/checkToken");

// Record Routines
Router.post("/register", User.userRegister);
Router.post("/login", User.userLogin);

Router.get("/checkToken", checkToken, User.checkToken);
Router.get("/:id", User.getUserById);

module.exports = Router;