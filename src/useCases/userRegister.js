const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const createUserToken = require("../Helpers/createUserToken");

class UserRegisterCase {
  async execute(name, email, password) {
    const validEmail = await User.findOne({ where: { email: email } });

    // Check if email exists
    if (validEmail) return { error: "Email já cadastrado!" };

    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const userCreate = await User.create({
        name,
        email,
        password: passwordHash,
      });

      const user = {
        id: userCreate.id,
        name: userCreate.name,
        email: userCreate.email,
      };

      return { user };
    } catch (error) {
      return { error: error };
    }
  }
}

module.exports = UserRegisterCase;
