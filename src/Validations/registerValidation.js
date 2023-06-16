const { body, validationResult } = require("express-validator");

// Função de middleware para validação de email e senha
const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("O nome é obrigatório!")
    .isLength()
    .withMessage("Nome inválido!"),
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
  body("confirmPassword")
    .notEmpty()
    .withMessage("A confirmação de senha é obrigatória!")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("As senhas não conferem!"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = registerValidation;
