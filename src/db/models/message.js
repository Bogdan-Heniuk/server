import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: String,
    isViewed: {type: "boolean", default: false}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
