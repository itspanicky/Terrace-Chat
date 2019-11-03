const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    text: {
        type: String,
        required: true
    }
}, {
  timestamps: true
})

// hash the plain text password before saving
MessageSchema.pre('save', async function(next) {
  const message = this;
  console.log('Update Room of this Msg')

  next();
})

module.exports = Message = mongoose.model('Message', MessageSchema);
