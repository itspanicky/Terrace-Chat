const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivingRoomSchema = new Schema ({
    name: {
        type: String,
        required: true,
    }, 
    users: [

    ],
    messages: [

    ],
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = LivingRoom = mongoose.model('living rooms', LivingRoomSchema);