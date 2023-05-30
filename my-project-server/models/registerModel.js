import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const dataSchema = new mongoose.Schema({
  username: {
    unique: true,
    trim: true,
    type: String
  },
  name: {
    trim: true,
    type: String
  },
  email: {
    unique: true,
    trim: true,
    type: String
  },
  password: {
    trim: true,
    type: String,
  },
  follows: {
    type: Number,
  },
  followers: {
    type: Number,
  },
  tweets: [tweetSchema],
})

export default mongoose.model('Users', dataSchema);
