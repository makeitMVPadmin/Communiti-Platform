const express = require("express");

const chatsController = require("../controllers/chatsController.js");

const chatsRouter = express.Router();

chatsRouter.get("/", chatsController.getAllchats);

chatsRouter.get("/chats/:chatId", chatsController.getSinglechat);

chatsRouter.post("/chats", chatsController.addchats);



module.exports = chatsRouter;
