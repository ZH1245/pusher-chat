const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    roomID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ChatRooms",
    },
    message: { type: String, required: true },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    // sender: {
    //   type: Types.ObjectId,
    //   ref: "users",
    // },
    // receiver: {
    //   type: Types.ObjectId,
    //   ref: "users",
    // },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
