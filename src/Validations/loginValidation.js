const { body, validationResult } = require("express-validator");

// Função de middleware para validação de email e senha
const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("O email é obrigatório!")
    .isEmail()
    .withMessage("Email inválido!"),
  body("password")
    .notEmpty()
    .withMessage("A senha é obrigatória!")
    .isLength({ min: 5 })
    .withMessage("A senha deve ter pelo menos 6 caracteres!"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = loginValidation;
