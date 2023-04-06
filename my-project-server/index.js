import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'

import loginRouter from "./routes/login.js"
import registerRouter from "./routes/register.js"

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

const verifyToken = (req, res, next) => {
  const url = decodeURI(req.url) 
  if ( url == '/api/login' || url == '/api/register' ) {
    return next()
  }
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    console.log(verified)
    next() // continuamos
  } catch (error) {
    res.status(400).json({error: 'token no es válido'})
  }
}

app.use(verifyToken)

//El orden en el que se pongan los modulos, importa
// OJO a la hora de colocarlos

app.use('/api', loginRouter, registerRouter, router)

app.listen(process.env.PORT, () => {
  console.log('The API is listening at port', process.env.PORT)
})


export default app
