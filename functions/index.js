const functions = require("firebase-functions");
const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.get("/twat", (req, res) => {
  res.status(200).json({ message: "twat" });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
