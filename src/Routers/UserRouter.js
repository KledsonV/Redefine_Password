const Router = require("express").Router();

const User = require("../Controllers/UserController");
const user = new User();

// Middlewares
const checkToken = require("../Helpers/checkToken");
const checkCode = require("../Helpers/checkCode");
const loginValidation = require("../Validations/loginValidation");
const registerValidation = require("../Validations/registerValidation");
const passwordValidation = require("../Validations/passwordValidation");

// Record Routines
Router.get("/users/:id", user.getUserById);

Router.post("/login", loginValidation, user.userLogin);
Router.post("/users", registerValidation, user.userRegister);
Router.post("/user/changePassword", checkToken, user.getCodePassword);
Router.put("/user/changePassword", checkToken, user.verifyCode);
Router.patch("/user/changePassword", checkToken, checkCode, passwordValidation, user.changePass);

module.exports = Router;