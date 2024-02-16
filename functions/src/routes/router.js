const express = require("express");

const eventsRouter = require("./eventsRouter");
const userRouter = require("./userRouter");
const communitiesRouter = require("./communitiesRouter");
const attachmentsRouter = require("./attachmentsRouter");

const router = express.Router();

router.use("/events", eventsRouter);
router.use("/user", userRouter);
router.use("/communities", communitiesRouter);
router.use("/attachments", attachmentsRouter);

module.exports = router;