const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitingRoomSchema = new Schema(
  {
    males: [],
    females: []
  },
  {
    timestamps: true,
  }
);

module.exports = WaitingRoom = mongoose.model("WaitingRoom", WaitingRoomSchema);
