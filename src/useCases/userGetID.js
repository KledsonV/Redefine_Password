const User = require("../Models/User");

class UserGetID {
  async execute(id) {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return { error: "ID inexistente!" };
    }

    try {
      return { user };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserGetID;
