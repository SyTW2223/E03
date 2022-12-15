import {Document, Schema, model} from 'mongoose';

export interface userInterface extends Document {
  name: string,
  surname: string,
  id: number,
  username: string,
  mail: string,
  followers: number,
  follow: number,
  sex?: 'mujer' | 'hombre' | 'otro',
  description: string,
  password: string
  login: boolean,
}

const  UserSchema = new Schema<userInterface>({
  name : {
    type: String,
    trim: true
  },
  surname : {
    type: String,
    trim: true
  },
  mail : {
    type: String,
    trim: true
  },
  followers : {
    type: Number,
    trim: true
  },
  follow : {
    type: Number,
    trim: true
  },
  sex : {
    type: String,
  },
  description : {
    type: String,
  },
  password : {
    type: String,
  },
  login : {
    type: Boolean,
  }
})

export const Usuario = model<userInterface>('usuario', UserSchema);