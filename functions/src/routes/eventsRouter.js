const express = require("express");

const eventsController = require("../controllers/eventsController.js");

const eventsRouter = express.Router();

eventsRouter.get("/", eventsController.getAllEvents);

eventsRouter.get("/:eventId", eventsController.getSingleEvent);

eventsRouter.patch("/:eventId", eventsController.updateEvent);

eventsRouter.post("/", eventsController.addEvent);

eventsRouter.delete("/:eventId", eventsController.deleteEvent);

eventsRouter.post("/:eventId/users", eventsController.addAttendingUsersToEvent);

module.exports = eventsRouter;
