const express = require("express");

const User = require("../Models/User");

const UserRegisterCase = require("../useCases/userRegister");
const UserLoginUseCase = require("../useCases/userLogin");
const UserGetID = require("../useCases/userGetID");

// Helpers
const getToken = require("../Helpers/getToken");
const createUserToken = require("../Helpers/createUserToken");
const getUserByToken = require("../Helpers/getUserByToken");
const sendCode = require("../useCases/sendCode");
const verifyCode = require("../Helpers/verifyCode");
const changePassword = require("../useCases/changePassword");

module.exports = class UserController {
  async userRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const userRegisterCase = new UserRegisterCase();
    const result = await userRegisterCase.execute(
      name,
      email,
      password,
      confirmPassword
    );
    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    const { user } = result;

    await createUserToken(req, res, user);
  }

  async userLogin(req, res) {
    const { email, password } = req.body;

    const userLoginUseCase = new UserLoginUseCase();
    const result = await userLoginUseCase.execute(email, password);

    if (result.error) {
      return res.status(404).json(result.error);
    }
    const { user } = result;

    await createUserToken(req, res, user);
  }

  async getUserById(req, res) {
    const id = req.params.id;

    const userGetID = new UserGetID();
    const result = await userGetID.execute(id);

    if (result.error) {
      return res.json({ message: result.error });
    }

    const { user } = result;

    res.json({ user });
  }

  async getCodePassword(req, res) {
    const email = req.body.email;

    const token = getToken(req);

    const userByToken = await getUserByToken(res, token);

    const checkEmail = userByToken.email;

    const SendCode = new sendCode();
    const code = await SendCode.execute(req, res, email, checkEmail);

    if (code.error) {
      res.status(404).json(code.error);
    }
  }

  async verifyCode(req, res) {
    const code = req.body.code;

    await verifyCode(req, res, code);
  }

  async changePass(req, res) {
    const { password, confirmPassword } = req.body;

    const changeP = new changePassword();
    const passwordChange = await changeP.execute(
      req,
      res,
      password,
      confirmPassword
    );

    if (passwordChange.error) {
      res.status(404).json(passwordChange.error);
    }

    if (passwordChange.message) {
      res.status(202).json(passwordChange.message);
    }
  }
};
