const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Token não definido" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); //aqui no caso iria "descriptografar" o token

    req.userId = decoded.id; // define o id do usuario em toda rota
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
