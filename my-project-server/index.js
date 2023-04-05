import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'

import loginRouter from "./routes/login.js"
import registerRouter from "./routes/register.js"

import router from './routes/routes.js'
import mongoose from 'mongoose'

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

//El orden en el que se pongan los modulos, importa
// OJO a la hora de colocarlos

app.use('/api', loginRouter, registerRouter, router)

app.listen(process.env.PORT, () => {
  console.log('The API is listening at port', process.env.PORT)
})


export default app
