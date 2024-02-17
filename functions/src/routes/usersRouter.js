const express = require("express");

const usersController = require("../controllers/usersController.js");

const usersRouter = express.Router();

usersRouter.get("/:userId", usersController.getUser);

usersRouter.get("/", usersController.getAllUsers);

usersRouter.patch("/:userId", usersController.updateUser);

usersRouter.post("/", usersController.addUser);

usersRouter.delete("/:userId", usersController.deleteUser);

usersRouter.post("/:userId/meetings", usersController.addMeetingToUser);

usersRouter.delete("/:userId/meetings", usersController.deleteMeetingFromUser);

usersRouter.post("/:userId/chats", usersController.addChatToUser);

usersRouter.delete("/:userId/chats", usersController.deleteChatFromUser);

usersRouter.post("/:userId/communitiesJoined", usersController.joinCommunity);

usersRouter.delete("/:userId/communitiesJoined", usersController.leaveCommunity);

usersRouter.post("/:userId/connections", usersController.addConnection);

usersRouter.delete("/:userId/connections", usersController.deleteConnection);

usersRouter.post("/:userId/events", usersController.joinEvent);

usersRouter.delete("/:userId/events", usersController.leaveEvent);

usersRouter.post("/:userId/communitesManaged", usersController.addCreatedCommunity);

usersRouter.delete("/:userId/communitiesManaged", usersController.deleteManagedCommunity);


module.exports = userRouter;
