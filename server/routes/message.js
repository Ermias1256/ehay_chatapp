import express from "express";
import auth from "../middleware/auth.js";
import {
  getUserChats,
  newMessage,
  editMessage,
  deleteMessage,
} from "../controllers/message.js";

const router = express.Router();

router.get("/userchats", auth, getUserChats);
router.post("/new", auth, newMessage);
router.patch("/edit/:messageId", auth, editMessage);
router.delete("/delete/:messageId", auth, deleteMessage);

export default router;
