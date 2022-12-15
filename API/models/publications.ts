import {Document, Schema} from 'mongoose';

export interface publicationInterface extends Document {
  content: string,
  idUser: number,
  idPublication: number,
  date: string,
  likes: number,
  comments?: string,
}

const  PublicationSchema = new Schema<publicationInterface>({
  content: {
    type:String, // | video | foto,
    required: true
  },
  idUser: {
    type: Number,
    required: true
  },
  idPublication: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    trim: true
  },
  comments: {
    type: String
  },
})