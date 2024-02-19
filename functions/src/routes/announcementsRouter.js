const express = require("express");

const announcementsController = require("../controllers/announcementsController.js");


announcementsRouter.get("/", announcementsController.getAllAnnouncements);

announcementsRouter.get("/:announcementId", announcementsController.getSingleAnnouncement);

announcementsRouter.patch("/:announcementId", announcementsController.updateAnnouncement);

announcementsRouter.post("/", announcementsController.addAnnouncement);

announcementsRouter.delete("/:announcementId", announcementsController.deleteAnnouncement);


module.exports = announcementsRouter;