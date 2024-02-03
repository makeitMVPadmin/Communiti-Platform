const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const express = require("express");
const bodyParser = require("body-parser");

const eventsRouter = require("./src/routes/eventsRouter");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/events", eventsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

exports.app = functions.https.onRequest(app);
