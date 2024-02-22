const express = require("express");

const announcementsController = require("../controllers/announcementsController");

const announcementsRouter=express.Router();

announcementsRouter.get("/", announcementsController.getAllAnnouncements);

announcementsRouter.get("/:announcementId", announcementsController.getSingleAnnouncement);

announcementsRouter.patch("/:announcementId", announcementsController.updateAnnouncement);

announcementsRouter.post("/", announcementsController.addAnnouncements);

announcementsRouter.delete("/:announcementId", announcementsController.deleteAnnouncement);


module.exports = announcementsRouter;