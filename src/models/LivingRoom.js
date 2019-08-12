const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivingRoomSchema = new Schema(
  {
    name: {
      type: String
    },
    messagesInRoom: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    usersInRoom: [{ type: Schema.Types.ObjectId, ref: "User"}]
  },
  {
    timestamps: true
  }
);

// Virtual Property - helps mongoose see how these things are related
LivingRoomSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'livingroom'
})

    // await req.livingroom
    //   .populate({
    //     path: "users",
    //     match
    //     }
    //   })
    //   .execPopulate();


module.exports = LivingRoom = mongoose.model('LivingRoom', LivingRoomSchema);