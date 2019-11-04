const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Room = require("../../models/Room");
const Message = require("../../models/Message");

// Create Message '/api/messages/create'
// EXAMPLE BODY POST REQUEST
// {
// 	"room": "5dbf2435c4c2886ccb15b95d",
// 	"text": "Nickys wak"
// }
router.post("/create", auth, async (req, res) => {
    const user = req.user;
    const roomId = req.body.room
    
    req.body.user = user._id
    try {
          // Validate that room exists.
          if (!roomId) {
            throw new Error("Need room Id.");
          }
          // Validate that you belong in room.
          if (
            !user.privaterooms.filter(room => room._id === roomId) &&
            user.livingroom._id !== roomId
          ) {
            throw new Error("User does not belong in this room.");
          }
          const message = new Message(req.body);
          await message.save();
          // Needs to update Room model messages with MessageID
          const room = await Room.findOne({ _id: roomId });
          await room.updateOne({ messages: [...room.messages, message._id] });
          await room.save();

          res.status(201).send({ message });
        } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;
