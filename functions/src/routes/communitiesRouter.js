const express = require("express");

const communitiesController = require("../controllers/communitiesController.js");

const communitiesRouter = express.Router();

communitiesRouter.get("/", communitiesController.getAllCommunities);

communitiesRouter.get("/:communityId", communitiesController.getSingleCommunity);

communitiesRouter.patch("/:communityId", communitiesController.updateCommunity);

communitiesRouter.post("/", communitiesController.addCommunity);

communitiesRouter.post("/:communityId/members", communitiesController.addMemberToCommunity);

communitiesRouter.delete("/:communityId/members", communitiesController.deleteMemberFromCommunity);

communitiesRouter.delete("/:communityId", communitiesController.deleteCommunity);

communitiesRouter.post("/:communityId/announcements", communitiesController.addAnnouncementToCommunity);

communitiesRouter.delete("/:communityId/announcements", communitiesController.deleteAnnouncementFromCommunity);

communitiesRouter.post("/:communityId/events", communitiesController.addEventToCommunity);

communitiesRouter.delete("/:communityId/events", communitiesController.deleteEventFromCommunity);

communitiesRouter.post("/:communityId/newsletters", communitiesController.addNewsLetterToCommunity);

communitiesRouter.delete("/:communityId/newsletters", communitiesController.deleteNewsletterFromCommunity);


module.exports = communitiesRouter;
