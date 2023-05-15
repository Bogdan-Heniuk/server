import { Router } from "express";
import ChatController from "../controllers/chat.js";
import AuthMiddleware from "../middlewares/auth.js";

const chatRouter = new Router();

chatRouter.get(
  "/",
  AuthMiddleware({ requiredLogin: true }),
  ChatController.getChats
);

chatRouter.get(
  "/:id",
  AuthMiddleware({ requiredLogin: true }),
  ChatController.getChatById
);

export default chatRouter;
