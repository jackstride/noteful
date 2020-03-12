const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  const token = await req.cookies.access_token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(createError(401, "Token is not valied"));
  }
};