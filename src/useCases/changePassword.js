const User = require("../Models/User");
const getToken = require("../Helpers/getToken");
const getUserByToken = require("../Helpers/getUserByToken");

const bcrypt = require("bcryptjs");

module.exports = class changePassword {
  async execute(req, res, password) {
    const token = await getToken(req);
    const user = await getUserByToken(res, token);

    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newPassword = await User.update(
      { password: passwordHash },
      { where: { id: user.id } }
    );

    if (!newPassword) return { error: "Erro no servidor!" };

    try {
      return { message: "Senha alterada com sucesso!" };
    } catch (error) {
      return { error: `Error: ${error}` };
    }
  }
};
