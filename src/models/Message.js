const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    livingroom: {
        type: Schema.Types.ObjectId,
        ref: 'LivingRoom'
    },
    text: {
        type: String,
        required: true
    }
}, {
  timestamps: true
})

module.exports = Message = mongoose.model('Message', MessageSchema);
