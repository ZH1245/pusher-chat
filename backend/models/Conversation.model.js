const { model, Schema, Types } = require("mongoose");
const chatRoomSchema = new Schema(
  {
    // name: String,
    // sender: { type: String },
    // receiver: {
    //   type: String,
    // },
    people: { type: Array, required: true },
    // sender: { type: Types.ObjectId, ref: "users" },
    // receiver: {
    //   type: Types.ObjectId,
    //   ref: "users",
    // },
  },
  { timestamps: true }
);
module.exports = model("ChatRooms", chatRoomSchema);
