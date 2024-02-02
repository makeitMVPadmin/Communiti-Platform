const express = require("express");
const eventsController = require("../controllers/eventsController.js");

const router = express.Router();

router.get("/", eventsController.getAllEvents);

router.get("/:eventId", eventsController.getSingleEvent);

router.post("/", eventsController.addEvents);

module.exports = router;
