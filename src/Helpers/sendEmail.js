const nm = require("nodemailer");
const random = require("../Helpers/generateCode");

const sendEmail = async (req, res, email) => {
  const result = await random();

  var transporter = await nm.createTransport({
    service: "outlook",
    auth: {
      user: "viniciusfernandes154@hotmail.com",
      pass: "vinicius1313",
    },
  });

  var mailOptions = await {
    from: "viniciusfernandes154@hotmail.com",
    to: email,
    subject: "You Code!",
    text: `Your code to reset the password is: ${result} `,
  };

  var transport = await transporter.sendMail(
    mailOptions,
    function (error, info) {
      if (error) {
        res.status(404).json({ error: error })
        return;
      }
      res.status(200).json({ message:  { Link: `http://localhost:3000/user/changePassword`} })
    }
  );
};

module.exports = sendEmail;
