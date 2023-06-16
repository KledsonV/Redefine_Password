const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

const random = async () => {
  var chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  var charLength = chars.length;
  var code = "";
  for (var i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * charLength));
  }

    await client.connect();
    await client.set(code, code, { EX: 60 });
    var result = await client.get(code);
    
    return result;
};

module.exports = random;
