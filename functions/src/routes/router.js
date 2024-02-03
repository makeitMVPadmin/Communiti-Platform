const express = require("express");

const eventsRouter = require("./eventsRouter");

const router = express.Router();

router.use("/events", eventsRouter);

module.exports = router;
