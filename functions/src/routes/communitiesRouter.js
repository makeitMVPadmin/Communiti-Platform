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

module.exports = communitiesRouter;
