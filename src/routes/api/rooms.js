const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Room = require("../../models/Room");
const User = require("../../models/User");
const validateRoom = require("../../validation/room");

// Create Room '/api/rooms/create'
// Mainly for private chats
// EXAMPLE BODY POST REQUEST
// {
// 	"usersInRoom": [
// 		{"_id": "5dbf202f651dcd6b88c666d0"}
// 		]
// }
router.post('/create', auth, async (req, res) => {
  // CONCERNS
  // Look for 3 males and 3 females in database and form livingroom.
  try {
    const user = req.user 
    // Assumes frontend Post doesn't have own user id.
    const { errors, isValid } = validateRoom(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    req.body.usersInRoom.push({_id: user.id})
    const room = new Room(req.body);
    await room.save();
    // Need to update Users' privaterooms  with this ObjectId
    req.body.usersInRoom.forEach( async (user) => {
      let currUser = await User.findOne({_id: user._id})
      await currUser.updateOne({privaterooms: [...currUser.privaterooms, room._id]})
    })
    res.status(201).send({ room });
    } catch (e) {
    res.status(400).send(e)
  }
})

// GET all messages and userIds in Room
// Example Query {{url}}/api/rooms/messages?roomId=5dbf2435c4c2886ccb15b95d
router.get('/messages', auth, async (req, res) => {
  const { roomId, start, end } = req.query
  const limitAmt = end - start
  try {
    // if there is a specified params
    if (start && end) {
      const room = await Room.findOne({ _id: roomId}).populate({
        path: 'Message',
        options: {
          limit: limitAmt,
          skip: end
        }
      })
      // assume that array in database is in order based on recency. 
      res.status(201).send({ room })
    } else {
      // sends all messages if params not specified.
      const room = await Room.findOne({ _id: roomId})
      room.populate({ path: 'Message' })
      res.status(201).send({ room })
    }
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router;