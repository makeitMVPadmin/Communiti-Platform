const express = require("express");

const attachmentsController = require("../controllers/attachmentsController.js");

const attachmentsRouter = express.Router();

attachmentsRouter.get("/:attachmentId", attachmentsController.getSingleAttachment);

attachmentsRouter.get("/", attachmentsController.getAllattachments);

attachmentsRouter.patch("/:attachmentId", attachmentsController.updateAttachment);

attachmentsRouter.post("/", attachmentsController.addAttachment);

communitiesRouter.delete("/:attachmentId", attachmentsController.deleteAttachment);

module.exports = attachmentsRouter;