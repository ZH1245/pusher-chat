import { Router } from "express";
import { GetMessages, SendMessage } from "../controllers/Message.controller";
import { userAuth } from "../middlewares/auth.middleware";
const router = Router();

router.get("/room-messages", userAuth, GetMessages);
router.post("/new-message", SendMessage);

export default router;
