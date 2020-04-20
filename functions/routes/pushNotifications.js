const webpush = require("web-push");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const publicVapidKey = process.env.VAPID_PUBLIC;

const privateVapidKey = process.env.VAPID_SECRET;

const key = "AIzaSyClZUxmL24KG2na5hrGPLnK0u0S3V5Ig70";


webpush.setGCMAPIKey(key);
webpush.setVapidDetails(
  "mailto:jackstride@outlook.com",
  publicVapidKey,
  privateVapidKey
);

// Auth header

// Subscribe route
router.post("/subscribe", async (req, res) => {
  // get the sub object
  const subscription = req.body;

  // Create payload
  const payload = JSON.stringify({
    title: "push test",
  });

  const options = {
    TTL: 60,
  };
  webpush
    .sendNotification(subscription, payload, options)
    .catch((err) => console.error(err));
    res.status(201).json({ test: "test" });
});

module.exports = router;
