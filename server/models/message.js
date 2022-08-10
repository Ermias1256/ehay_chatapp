import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  receiver: { type: String, required: true },
  messageText: {
    type: String,
    required: true,
  },
  creator: String, // the creator of the message
  createdAt: {
    // date of creation
    type: Date,
    default: new Date(),
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
