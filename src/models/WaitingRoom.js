const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitingRoomSchema = new Schema(
  {
    males: { type: Array, default: [] },
    females: { type: Array, default: [] }
  },
  {
    timestamps: true,
  }
);

module.exports = WaitingRoom = mongoose.model("WaitingRoom", WaitingRoomSchema);
