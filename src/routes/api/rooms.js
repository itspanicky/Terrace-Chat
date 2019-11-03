const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Room = require("../../models/Room");
const validateRoom = require("../../validation/room");

// Create Room '/api/rooms/create'
// Mainly for private chats
router.post('/create', auth, async (req, res) => {
  // CONCERNS
  // Need to update Users' privaterooms  with this ObjectId

  const user = req.user 
  // Assumes frontend Post doesn't have own user id.
  req.body.usersInRoom.push({_id: user.id})
  const { errors, isValid } = validateRoom(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // Look for 3 males and 3 females in database and form livingroom.
  try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).send({ room });
      } catch (e) {
    res.status(400).send(e)
  }
})

// GET all messages in Room
// Example Query {{url}}/api/rooms/messages?roomId=5dbf2435c4c2886ccb15b95d
router.get('/messages', auth, async (req, res) => {
  const { roomId, start, end } = req.query
  try {
    const room = await Room.findOne({ _id: roomId}).populate({
      path: 'Message',
      options: {
        limit: 15,
        skip: start
      }
    })
    if (start && end) {
      // assume that array in database is in order based on recency. 
      res.status(201).send({ messages: room.messages })
    } else {
      room.populate({ path: 'Message' })
      res.status(201).send({ messages: room.messages })
    }
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router;