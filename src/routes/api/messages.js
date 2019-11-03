const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Room = require("../../models/Room");
const Message = require("../../models/Message");

// Create Message '/api/messages/create'
router.post("/create", auth, async (req, res) => {
    const user = req.user;
    const roomId = req.body.room
    // CONCERNS
    // Validate that you belong in this room.
    //  [code here]
    // Needs to update Room model messages with MessageID

    req.body.user = user._id
  try {
      const message = new Message(req.body);
      await message.save();
      const room = await Room.findOne({ _id: roomId})
      await room.updateOne({ messages: [...room.messages, message._id]})
      await room.save()

    res.status(201).send({ message });
  } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;
