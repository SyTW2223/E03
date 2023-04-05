import mongoose from 'mongoose'

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
  }
})

export default mongoose.model('Users', dataSchema);
