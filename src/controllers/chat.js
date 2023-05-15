import ChatService from "../services/chat.js";

class Chat {
  async getChats(req, res) {
    const { _id, role } = req.user;
    const chats = await ChatService.getChats({ userId: _id, role });
    res.json(chats);
  }

  async getChatById(req, res) {
    const chatId = req.params.id;
    const chat = await ChatService.getChatById(chatId);
    res.json(chat);
  }
}

export default new Chat();
