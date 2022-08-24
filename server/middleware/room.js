import Room from "../models/room.js";

const createRoom = async (req, res, next) => {
  const senderId = req.userId;

  const { roomId } = req.body;
  try {
    if (!roomId) {
      const newRoom = await Room.create({
        creator: senderId,
        createdAt: new Date().toISOString(),
      });
      req.roomId = newRoom._id;
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something goes wrong with creating room id" });
  }
};

export default createRoom;
