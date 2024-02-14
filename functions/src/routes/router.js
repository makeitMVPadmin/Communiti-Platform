const express = require("express");

const eventsRouter = require("./eventsRouter");
const userRouter = require("./userRouter");

const router = express.Router();

router.use("/events", eventsRouter);
router.use("/user", userRouter);
router.use("/chats", ChatsRouter);

module.exports = router;
