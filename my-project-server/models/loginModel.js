import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
  email: {
      required: true,
      type: String
  },
  password: {
      required: true,
      type: String
  }
})

const Model = mongoose.model('Data', dataSchema)

export default Model