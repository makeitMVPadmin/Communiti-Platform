const express = require("express");

const messagesController = require("../controllers/messagesController.js");

const messagesRouter = express.Router();

messagesRouter.get("/:messageId", messagesController.getSingleMessage);

messagesRouter.get("/", messagesController.getAllMessages);

messagesRouter.post("/", messagesController.addMessage);

messagesRouter.patch("/:messageId", messagesController.updateMessage);

messagesRouter.delete("/:messageId", messagesController.deleteMessage);

module.exports = messagesRouter;
