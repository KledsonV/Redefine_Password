const User = require("../Models/User");
const redis = require("redis");
const client = redis.createClient();

module.exports = class changePassword {
  async execute(res, code) {
    await client.connect();
    const codeVerify = await client.get(code);

    if (codeVerify == null){
      await client.disconnect();
      return res.status(404).json({ message: "Codigo inválido!" });
    }
    await client.disconnect();
  }
}