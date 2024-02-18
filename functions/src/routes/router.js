const express = require("express");

const eventsRouter = require("./eventsRouter");
const userRouter=require("./userRouter");
const chatsRouter=require("./chatsRouter")

const router = express.Router();

router.use("/events", eventsRouter);
router.use("/user", userRouter);
router.use("/chats", chatsRouter);

module.exports = router;
