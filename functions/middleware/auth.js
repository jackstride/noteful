const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  const token = req.cookies.__session;
  console.log(req.cookies.session);
  console.log(req.cookies.__session);

  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log("True");
    return next();
  } catch (err) {
    console.log("failed");
    return next(createError(401, "Token is not valied"));
  }
};
