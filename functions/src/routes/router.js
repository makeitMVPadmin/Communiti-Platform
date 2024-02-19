const express = require("express");

const eventsRouter = require("./eventsRouter");

const userRouter=require("./userRouter");
const chatsRouter=require("./chatsRouter")
const messagesRouter = require("./messagesRouter");
const communitiesRouter=require("./communitiesRouter");
const announcementRouter=require("./announcementsRouter")




const router = express.Router();



router.use("/events", eventsRouter);
router.use("/user", userRouter);
router.use("/chats", chatsRouter);
router.use("/messages", messagesRouter);
router.use("/communities", communitiesRouter);
router.use("/announcements", announcementRouter)


module.exports = router;
