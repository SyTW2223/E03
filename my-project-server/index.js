import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'

import loginRouter from "./routes/login.js"
import registerRouter from "./routes/register.js"
import tweetRouter from "./routes/tweet.js"
import searchUserRouter from "./routes/searchUser.js"
import userRouter from "./routes/user.js"

import router from './routes/routes.js'
import mongoose from 'mongoose'

import jwt from 'jsonwebtoken'

config()
// Conexion con la base de datos

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})


//Start de la API
const app = express()

app.use(express.json())
app.use(cors())

const createLog = (req, res, next) => {
  console.log(req.method, decodeURI(req.url), req.body);
  next();
};

app.use(createLog)

const verifyToken = async (req, res, next) => {
  const header = req.header('authorization')
  if (typeof header !== 'undefined')  {
    const bearer = header.split(' ')
    const token = bearer[1]
    await jwt.verify(token,  process.env.TOKEN_SECRET, async (err) => {
      if (err) {
        res.status(401).json({error: 'token no es válido'})
      } else {
        await next();
      }
    })
  } else {
    return res.status(401).json({ error: 'Acceso denegado' })
  }
}

app.use('/api', loginRouter, registerRouter)
app.use(verifyToken)

//El orden en el que se pongan los modulos, importa
// OJO a la hora de colocarlos


app.use('/api', tweetRouter, searchUserRouter, userRouter, router)

app.listen(process.env.PORT, () => {
  console.log('The API is listening at port', process.env.PORT)
})


export default app
