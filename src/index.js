const express = require("express");
const app = express();

const { config } = require("../config/index");

// app.use(express.json());

app.get("/", function (req, res) {
  res.send("xd");
});

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
