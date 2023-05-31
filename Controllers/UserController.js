const express = require("express");

// Express Validator
const { body, validationResult } = require("express-validator");

const User = require("../Models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helpers
const getToken = require("../Helpers/getToken");
const createUserToken = require("../Helpers/createUserToken");

module.exports = class UserController {
  static async userRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const validEmail = await User.findOne({ where: { email: email } });

    // Validation rules
    const validationRules = [
      body("name").notEmpty().withMessage("O nome é obrigatório!"),
      body("email")
        .notEmpty()
        .withMessage("O email é obrigatório!")
        .isEmail()
        .withMessage("Email inválido!"),
      body("password").notEmpty().withMessage("A senha é obrigatória!"),
      body("confirmPassword")
        .notEmpty()
        .withMessage("A confirmação de senha é obrigatória!")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("As senhas não conferem!"),
    ];

    // Run validations
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    // Check for validation errorsLL
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.array() });
    }

    // Check if email exists
    if (validEmail)
      return res.status(402).json({ message: "Email já cadastrado!" });

    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      await User.create({ name, email, password: passwordHash });
      createUserToken(req, res, User);
    } catch (error) {
      console.log(error);
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

    const emailValid = await User.findOne({ where: { email: email } });

    // Validations
    if (!email)
      return res.status(402).json({ message: "O email é obrigatório!" });
    if (!password)
      return res.status(402).json({ message: "A senha é obrigatória!" });
    if (!emailValid) return res.json({ message: "Email não cadastrado!" });

    const passCompare = await bcrypt.compareSync(password, emailValid.password);

    if (!passCompare)
      return res.status(402).json({ message: "Senha incorreta!" });

    const user = {
      id: emailValid.id,
      name: emailValid.name,
      email: emailValid.email,
    };

    try {
      await createUserToken(req, res, user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findOne({ where: { id: id } });

    try {
      res.status(200).json({ message: user });
    } catch (error) {
      console.log(error);
    }
  }

  static async checkToken(req, res) {
    let infoUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, process.env.SECRETJWT);

      infoUser = await User.findOne({ where: { id: decoded.id } });

      infoUser.password = undefined;
    } else {
      infoUser = null;
    }

    res.status(200).send(infoUser);
  }
};
