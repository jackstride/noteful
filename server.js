const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios");

//app.use(express.static("build"));

app.get("/test", (req, res) => {
  const test = [
    { id: 1, name: "jack" },
    { id: 1, name: "jack" },
    { id: 1, name: "jack" },
    { id: 1, name: "jack" }
  ];

  res.send(test);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
