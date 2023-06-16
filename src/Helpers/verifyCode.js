const User = require("../Models/User");
const redis = require("redis");
const getUserByToken = require("./getUserByToken");
const getToken = require("./getToken");
const client = redis.createClient();

const verifyCode = async (req, res, code) => {
  await client.connect();
  const codeVerify = await client.get(code);

  if (codeVerify == null) {
    await client.disconnect();
    return res.status(404).json({ message: "Codigo inválido!" });
  }

  await client.del(code);
  await client.disconnect();
  const token = await getToken(req);
  const user = await getUserByToken(res, token);

  await client.connect();
  await client.set(`id-${user.id}`, user.id, {EX: 500});
  await client.disconnect();

  res.status(200).json({ message: { message: ["Codigo válido!", `Link: http://localhost:3001/user/changePassword/${user.id}`] } });

};

module.exports = verifyCode;
