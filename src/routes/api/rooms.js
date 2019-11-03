const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Room = require("../../models/Room");

// Create Room '/api/rooms/create'
// Mainly for private chats
router.post('/create', auth, async (req, res) => {
  const user = req.user 
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // Look for 3 males and 3 females in database and form livingroom.
  try {
        const room = new Room(req.body);
        await user.save();
        // createRoom(user)
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
      } catch (e) {
    res.status(400).send(e)
  }

})

module.exports = router