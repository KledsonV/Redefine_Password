const jwt = require("jsonwebtoken");

const createToken = async (req, res, user) =>
{
    const token = await jwt.sign({
        name: user.name,
        id: user.id
    }, process.env.SECRETJWT)

    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: user.id,
      });
}

module.exports = createToken