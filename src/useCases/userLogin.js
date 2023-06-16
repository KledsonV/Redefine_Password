const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const createUserToken = require("../Helpers/createUserToken");

class UserLoginUseCase {
  async execute(email, password) {
    const emailValid = await User.findOne({ where: { email: email } });

    if (!emailValid) {
      return { error: {message: "Email não cadastrado!"} };
    }

    const passCompare = await bcrypt.compareSync(password, emailValid.password);

    if (!passCompare) {
      return { error: {message: "Senha incorreta!"} };
    }

    const user = {
      id: emailValid.id,
      name: emailValid.name,
      email: emailValid.email,
    };

    try {
      return { user };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserLoginUseCase;
