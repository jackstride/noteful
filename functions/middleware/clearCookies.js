module.exports = async (req, res, next) => {
  try {
    let result = res.clearCookie("__session", { domain: ".noteful.app" });
    if (result) {
      return next();
    } else {
      return console.log("error");
    }
  } catch (err) {
    return next();
  }
};
