const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const createError = require("http-errors");

// Create transporter
//(Logsin to client)
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_LOGIN, // generated ethereal user
    pass: process.env.GMAIL_L_P, // generated ethereal password
  },
});

router.post("/support", async (req, res, next) => {
  let { name, email, message } = req.body;

  let info = await transporter.sendMail({
    from: email,
    to: "support@noteful.app jackstride@outlook.com",
    subject: "Support Request",
    text: "User who needs help " + name + "there message " + message,
    sender: "appnoteful@outlook.com",
  });

  try {
    if (info) {
      return res.send(200).json({ message: sent });
    } else {
      return next(createError(404, "There was an error"));
    }
  } catch (err) {
    return next(createError(404, "There was an error"));
  }
});

module.exports = router;
