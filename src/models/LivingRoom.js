const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivingRoomSchema = new Schema ({
    name: {
        type: String,
        required: true,
    }, 
    messages: [ {type: Schema.Types.ObjectId, ref: 'Message'}],
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

// Virtual Property - helps mongoose see how these things are related
userSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'livingroom'
})

    // await req.user
    //   .populate({
    //     path: "users",
    //     match
    //     }
    //   })
    //   .execPopulate();


module.exports = LivingRoom = mongoose.model('Livingroom', LivingRoomSchema);