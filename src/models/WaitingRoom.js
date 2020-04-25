const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitingRoomSchema = new Schema(
  {
    males: { type: Array },
    females: {type: Array }
  },
  {
    timestamps: true,
  }
);

module.exports = WaitingRoom = mongoose.model("WaitingRoom", WaitingRoomSchema);
