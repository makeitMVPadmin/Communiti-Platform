const express = require("express");

const eventsRouter = require("./eventsRouter");
const userRouter = require("./userRouter");
const messagesRouter = require("./messagesRouter");

const router = express.Router();

router.use("/events", eventsRouter);
router.use("/user", userRouter);
router.use("/messages", messagesRouter);

module.exports = router;
