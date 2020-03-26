const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/User");
const auth = require("../middleware/auth");

require("dotenv").config();

// @route GET api/auth
// @Desc Get logged in urser
// @access Private
router.get("/", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  try {
    return res.send(user);
  } catch (err) {
    return res
      .send(401)
      .json({ message: "" })
      .redirect("https://noteful.app/dashboard");
  }
});

module.exports = router;
