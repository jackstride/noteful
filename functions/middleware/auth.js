const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  const token = await req.cookies.access_token;
  console.log("token");

  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(createError(401, "Token is not valied"));
  }
};
