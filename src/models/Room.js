const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    name: {
      type: String
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    usersInRoom: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true
  },
  {
    toJSON: { virtuals: true }
  }
);

// toJSON is called whenever the room obj is stringified
// res.send uses JSON.stringify(obj) behind the scenes
RoomSchema.methods.toJSON = function () {
  const room = this
  // removes extra mongoose properties like .save()
  const roomObject = room.toObject()
  return roomObject
}

// hash the plain text password before saving
RoomSchema.pre('save', async function(next) {
  const room = this;
  console.log("Update Users")
  next();
})

// Virtual Property - helps mongoose see how these things are related
// RoomSchema.virtual('messages', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'livingroom'
// })

    // await req.livingroom
    //   .populate({
    //     path: "users",
    //     match
    //     }
    //   })
    //   .execPopulate();


module.exports = Room = mongoose.model('Room', RoomSchema);