import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    unique: true,
    trim: true,
    type: String
  },
  email: {
    required: true,
    unique: true,
    trim: true,
    type: String
  },
  password: {
    required: true,
    unique: true,
    trim: true,
    type: String,
  }
})

export default mongoose.model('Register', dataSchema);
