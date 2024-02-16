const express = require("express");

const eventsRouter = require("./eventsRouter");
const usersRouter = require("./usersRouter");
const communitiesRouter = require("./communitiesRouter");

const router = express.Router();

router.use("/events", eventsRouter);
router.use("/users", usersRouter);
router.use("/communities", communitiesRouter);

module.exports = router;
