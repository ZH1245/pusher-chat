const express = require("express");
const pusher = require("./lib/pusher");
require("dotenv").config();
const cors = require("cors");
const app = express();
const MessageModel = require("./models/Message.model");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.listen(4000, () => {
  console.log("Listening on port 3030");
});

mongoose
  .connect("mongodb://localhost:27017/pusher")
  .then(() => {
    console.log("Connection Established to DB");
  })
  .catch((e) => {
    console.log(e);
  });

let chatroomController = require("./controllers/ChatRoomController");
app.post("/chatroom/init", chatroomController.getorCreate);
app.get("/chatroom/mine", chatroomController.getMyConversations);
app.post("/message", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  pusher.trigger(`${req.body.roomID}`, "message-received", {
    message: req.body.message,
    from: req.body.from,
    to: req.body.to,
  });
  let newMessage = await MessageModel.create({
    roomID: req.body.roomID,
    sender: req.body.sender,
    receriver: req.body.receiver,
    message: req.body.message,
  });

  // res.send({ message: req.body.message, from: req.body.from, to: req.body.to });
  res.json(newMessage);
});
