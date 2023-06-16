const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// get user by jwt token
const getUserByToken = async (res, token) => {
  if (!token) return res.status(401).json({ error: "Acesso negado!" });

  try {
    // find user
    const decoded = jwt.verify(token, process.env.SECRETJWT);

    const userId = decoded.id;

    const user = await User.findOne({ where: { id: userId } });

    return user;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = getUserByToken;
