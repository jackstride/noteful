const webpush = require("web-push");
const express = require("express");
const router = express.Router();

const publicVapidKey = process.env.VAPID_PUBLIC;
const privateVapidKey = process.env.VAPID_SECRET;

webpush.setVapidDetails(
  "mailto:jackstride@outlook.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe route
router.post("/subscribe", (req, res, next) => {
  console.log(req.body);
  // get the sub object
  const subsciption = req.body;

  res.status(201).json({ test: "test" });

  // Create payload
  const payload = JSON.stringify({
    title: "push test",
  });

  // Send notificaiton

  webpush
    .sendNotification(subsciption, payload)
    .catch((err) => console.error(err));
});

module.exports = router;
