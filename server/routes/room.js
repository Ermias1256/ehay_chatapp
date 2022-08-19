import express from "express";
import auth from "../middleware/auth.js";
import { newRoom } from "../controllers/message.js";

const router = express.Router();

router.post("/new", auth, newRoom);

export default router;
