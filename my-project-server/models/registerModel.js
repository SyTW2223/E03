import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  username: {
    trim: true,
    type: String
  },
  message: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const followsUserSchema = new mongoose.Schema({
  username: {
    required: true,
    trim: true,
    type: String
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
  // follows: {
  //   type: Number,
  // },
  // followers: {
  //   type: Number,
  // },
  publications: [publicationSchema],

  follows: [followsUserSchema],

  followers: [followsUserSchema],
})

export default mongoose.model('Users', dataSchema);
