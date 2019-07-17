const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const multer = require("multer");
const sharp = require('sharp');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", auth, (req, res) => {
    res.json({ msg: "This is the users route" })    // test route
});

// Create User '/api/users/register'
router.post('/register', async (req, res) => {
  const {errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }

})

// Login User '/api/users/login'
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// LOGOUT '/api/users/logout'
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// LOGOUT of all and Remove all tokens from user '/api/users/logoutAll'
router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// GET User '/api/users/me'
router.get('/me', auth, async (req, res) => {
  res.send(req.user)
})

// UPDATE User '/api/users/me'
router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'dob', 'gender']
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'})
  }

  try {
    const user = req.user

    updates.forEach((update) => user[update] = req.body[update])

    await user.save()
    res.send(user)
  } catch (e) {
    return res.status(400).send(e)
  }
})

// DELETE user '/api/users/me'
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.suser)
  } catch (e) {
    res.status(500).send()
  }
})

// MULTER File Uploads
// without dest property, multer will pass to req for our access to the file instead.
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please provide a jpg, jpeg or png file.'))
    }
    cb(undefined, true)
  }
})

// UPLOAD Avatar '/api/users/me/avatar'
router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  // sharp is asynchronous
  // converts to only pngs and resizes
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()

  // buffer of binary data
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// DELETE Avatar '/api/users/me/avatar'
router.delete('/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

// GET avatar '/api/users/:id/avatar'
router.get('/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }

    // Set response header
    // Usually defaults to ("content-type", "application/json")
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router;
