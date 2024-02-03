const express = require("express");

const eventsController = require("../controllers/eventsController.js");

const eventsRouter = express.Router();

eventsRouter.get("/", eventsController.getAllEvents);

eventsRouter.get("/:eventId", eventsController.getSingleEvent);

eventsRouter.patch("/:eventId", eventsController.updateEvent);

eventsRouter.post("/", eventsController.addEvents);

eventsRouter.delete("/:eventId", eventsController.deleteEvent);

module.exports = eventsRouter;
