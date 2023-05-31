const jwt = require("jsonwebtoken");

const User = require("../Models/User");

// get user by jwt token
const getUserByToken = async (token) => {
  if (!token) return res.status(401).json({ error: "Acesso negado!" });

  // find user
  const decoded = jwt.verify(token, process.env.SECRETJWT);

  const userId = decoded.id;

  const user = await User.findOne({ id: userId });

  return user;
};

module.exports = getUserByToken;