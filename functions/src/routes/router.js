const express = require("express");

const eventsRouter = require("./eventsRouter");

const usersRouter=require("./usersRouter");
const chatsRouter=require("./chatsRouter")
const messagesRouter = require("./messagesRouter");
const communitiesRouter = require("./communitiesRouter");




const router = express.Router();



router.use("/events", eventsRouter);
router.use("/users", usersRouter);
router.use("/chats", chatsRouter);
router.use("/messages", messagesRouter);
router.use("/communities", communitiesRouter);


module.exports = router;
