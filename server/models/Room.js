import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  creator: String, // the creator of the message
  createdAt: {
    // date of creation
    type: Date,
    default: new Date(),
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
