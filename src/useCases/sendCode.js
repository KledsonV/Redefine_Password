const sendEmail = require("../Helpers/sendEmail");
const User = require("../Models/User");

module.exports = class sendCode {
  async execute(req, res, email, checkEmail) {
    const validEmail = await User.findOne({ where: { email: email } });

    if (!validEmail)
      return { error: { error: "Email não corresponde ao seu atual!" } };

    if (email != checkEmail)
      return { error: { error: "Email não corresponde ao seu atual!" } };

    sendEmail(req, res, email);
  }
};
