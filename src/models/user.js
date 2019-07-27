const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    gender : {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
      type: Buffer
    },
    livingroom: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    pastrooms: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
}, {
  timestamps: true
})

// toJSON is called whenever the user obj is stringified
// res.send uses JSON.stringify(obj) behind the scenes
UserSchema.methods.toJSON = function () {
  const user = this
  // removes extra mongoose properties like .save()
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, keys.secretOrKey);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  };

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  };

  return user;
}

// hash the plain text password before saving
UserSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  };

  next();
})

module.exports = User = mongoose.model('User', UserSchema);
