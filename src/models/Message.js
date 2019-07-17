const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    livingRoom: {
        type: Schema.Types.ObjectId,
        ref: 'living rooms'
    },
    text: {
        type: String,
        required: true
    }
}, {
  timestamps: true
})

module.exports = Message = mongoose.model('message', MessageSchema);
