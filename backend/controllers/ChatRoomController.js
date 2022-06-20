const ChatRoom = require("../models/Conversation.model");

const Conversation = {
  getorCreate: async (req, res) => {
    try {
      console.log(req.body);
      let existing = await ChatRoom.findOne({
        people: { $all: [req.body.sender, req.body.receiver] },
      });
      if (existing) {
        console.log(existing);
        return res.status(200).json({ roomID: existing._id });
      } else {
        let people = [req.body.sender, req.body.receiver];
        let newConversation = await ChatRoom.create({
          people,
        });
        console.log(newConversation);
        if (newConversation) return res.json({ newConversation });
        else {
          throw new Error("Cannot create in DB");
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ e });
    }
  },
  getMyConversations: async (req, res) => {
    try {
      console.log(req.body);
      let rooms = await ChatRoom.find({
        people: { $all: [req.body.me] },
      });

      if (rooms) return res.json(rooms);
      else {
        throw new Error("NOT FOUND");
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  },
};
module.exports = Conversation;
