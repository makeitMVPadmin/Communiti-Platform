const express = require("express");

const chatsController = require("../controllers/chatsController");

const chatsRouter = express.Router();

chatsRouter.get("/:chatId", chatsController.getSingleChat);

chatsRouter.get("/", chatsController.getAllChats);

chatsRouter.post("/", chatsController.addChat);

chatsRouter.patch("/:chatId", chatsController.updateChat);

chatsRouter.delete("/:chatId", chatsController.deleteChat);

module.exports = chatsRouter;
