const express = require("express");

const eventsController = require("../controllers/eventsController.js");

const router = express.Router();

router.get("/", eventsController.getAllEvents);

router.get("/:eventId", eventsController.getSingleEvent);

router.patch("/:eventId", eventsController.updateEvent);

router.post("/", eventsController.addEvents);

router.delete("/:eventId", eventsController.deleteEvent);

module.exports = router;
