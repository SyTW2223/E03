import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
  username: {
    unique: true,
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
  }
})

export default mongoose.model('Register', dataSchema);
