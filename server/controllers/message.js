import Mongoose from "mongoose";

import Message from "../models/message.js";
import User from "../models/user.js";
import { getError } from "../utils/constants.js";

const errorType = "MESSAGE";

export const getUserChats = async (req, res) => {
  const userId = req.userId; // the current user id
  const { chatWithId } = req.query; //friend
  const page = req.query.p || 0;
  const limitPerPage = 20;
  const index = page * limitPerPage;

  try {
    if (!userId) {
      res.status(404).json(getError(errorType, 2001));
    }

    if (!chatWithId) {
      res.status(404).json(getError(errorType, 2002));
    }

    // filter the chats between these two
    const chats = await Message.find({
      $and: [
        { creator: { $in: [userId, chatWithId] } },
        { receiver: { $in: [userId, chatWithId] } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(limitPerPage)
      .skip(index);

    // return the results
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "something goes wrong" });
  }
};

export const newMessage = async (req, res) => {
  const textLimit = 200;
  const senderId = req.userId;

  const receiverId = req.query.chatWithId;

  const { messageText } = req.body;

  if (!senderId) {
    return res.status(404).json(getError(errorType, 2001));
  }

  if (!Mongoose.Types.ObjectId.isValid(receiverId)) {
    return res.status(404).json(getError(errorType, 2002));
  }

  if (!messageText) {
    return res.status(404).json(getError(errorType, 2005));
  }

  if (messageText.length > textLimit) {
    return res.status(404).json(getError(errorType, 2006));
  }

  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json(getError(errorType, 2003));
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json(getError(errorType, 2004));
    }

    const newMessage = await Message.create({
      messageText: messageText,
      receiver: receiverId,
      creator: senderId,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json("something goes wrong.");
  }
};

export const editMessage = async (req, res) => {
  const textLimit = 200;
  const { messageId } = req.params;

  const userId = req.userId;

  const { messageText } = req.body;

  if (!messageText) {
    return res.status(404).json(getError(errorType, 2005));
  }

  if (messageText.length > textLimit) {
    return res.status(404).json(getError(errorType, 2006));
  }

  try {
    if (!Mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(404).json(getError(errorType, 2009));
    }

    // check if the user is the creator of the message
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json(getError(errorType, 2007));
    }

    if (message.creator !== userId) {
      return res.status(404).json(getError(errorType, 2008));
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      {
        messageText: messageText,
      },
      {
        new: true,
      }
    );

    return res.status(201).json(updatedMessage);
  } catch (error) {
    res.status(500).json("something goes wrong.");
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  const userId = req.userId;

  try {
    // check if the user is the creator of the message
    const message = await Message.findById(messageId);

    if (!Mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(404).json(getError(errorType, 2009));
    }

    if (!message) {
      return res.status(404).json(getError(errorType, 2007));
    }

    if (message.creator !== userId) {
      return res.status(404).json(getError(errorType, 2008));
    }

    await Message.findByIdAndDelete(messageId);

    return res.status(200).json({ message: "document deleted seccessfuly." });
  } catch (error) {
    res.status(500).json({ message: "something goes wrong." });
  }
};
