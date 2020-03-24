const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  let token = req.cookies.__session;

  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(createError(404, "There was an error"));
  }
};
