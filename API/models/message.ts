import {Document, Schema} from 'mongoose';

export interface MessageInterface extends Document {
  idMessage: number,
  user: string,
  message: string
}

const  MessageSchema = new Schema<MessageInterface>({
  idMessage : {
    type: Number,
    required: true,
    trim: true
  },
  user : {
    type: String,
    required: true
  },
  message : {
    type: String,
    required: true
  }
})