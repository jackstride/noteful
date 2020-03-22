const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const createError = require("http-errors");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_LOGIN, // generated ethereal user
    pass: process.env.GMAIL_L_P // generated ethereal password
  }
});

router.post("/support", async (req, res, next) => {
  let { name, email, message } = req.body;

  let info = await transporter.sendMail({
    from: email, // sender address
    to: "support@noteful.app jackstride@outlook.com", // list of receivers
    subject: "Suppoer Request", // Subject line
    text: message // plain text body
  });
  info ? console.log("true") : console.log(name);
});

module.exports = router;
