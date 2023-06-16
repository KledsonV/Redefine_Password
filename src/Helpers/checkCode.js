const jwt = require("jsonwebtoken");
const reddis = require("redis");
const getToken = require("./getToken");
const getUserByToken = require("./getUserByToken");
const client = reddis.createClient();

// middleware to validate token
const changePassword = async (req, res, next) => {
  const token = await getToken(req);
  const user = await getUserByToken(res, token);

  await client.connect();
  const codeVerify = await client.get(`id-${user.id}`);

  if (!codeVerify) {
    await client.disconnect();
    return res.status(401).json({ message: "O codigo é inválido ou expirou!" });
  }

  try {
    await client.disconnect();
    next();
  } catch (err) {
    res.status(400).json({ message: "O codigo é inválido ou expirou!" });
  }
};

module.exports = changePassword;
