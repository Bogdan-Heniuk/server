import { MESSAGE_POPULATED_FIELDS, CHAT_POPULATED_FIELDS } from "../common/enums.js";
import { BadRequest } from "../common/errors.js";
import ChatModel from "../db/models/chat.js";
import MessageModel from "../db/models/message.js";
import { Types } from "mongoose";

class Chat {
  async createChat({ vacancyId, candidateId, recruiterId }) {
    try {
      if ((!vacancyId || !candidateId, !recruiterId)) {
        throw new BadRequest("Невалідні дані");
      }
      return await ChatModel.create({
        vacancy: vacancyId,
        candidate: candidateId,
        recruiter: recruiterId,
      });
    } catch (e) {
      console.log("Failed to create chat", e);
      throw e;
    }
  }

  async getChats({ userId, role }) {
    try {
      const chats = await ChatModel.aggregate([
        {
          $match: { [role.toLowerCase()]: Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "chat",
            as: "messages",
          },
        },
      ]);

      const result = chats.map((chat) => {
        const lastMessageIndex = chat.messages.length - 1;
        chat.lastMessage = chat.messages[lastMessageIndex];
        delete chat.messages;
        return chat;
      });

      return result;
    } catch (e) {
      console.log("Failed to get chats", e);
      throw e;
    }
  }

  async getChatById(chatId) {
    try {
      const chat = await ChatModel.findOne({ _id: chatId })
        .populate(CHAT_POPULATED_FIELDS)
        .lean();
      const messages = await MessageModel.find({ chat: chatId }).populate(
        MESSAGE_POPULATED_FIELDS
      );
      chat.messages = messages;

      return chat;
    } catch (e) {
      console.log("Failed to get chat by id", e);
      throw e;
    }
  }

  async sendMessage({ chatId, userId, message }) {
    try {
      await MessageModel.create({ chat: chatId, user: userId, message });
    } catch (e) {
      console.log("Failed to get company by id", e);
      throw e;
    }
  }
}

export default new Chat();
