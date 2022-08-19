import Room from "../models/room.js";
import { getError } from "../utils/constants.js";

export const newRoom = async (req, res) => {
  const senderId = req.userId;

  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json(getError(errorType, 2003));
    }

    const newRoom = await Room.create({
      creator: senderId,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json("something goes wrong.");
  }
};
