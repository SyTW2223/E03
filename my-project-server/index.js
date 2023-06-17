import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'

import checkfollow from "./routes/checkfollow.js"
import following from "./routes/following.js"
import loginRouter from "./routes/login.js"
import publicationRouter from "./routes/publication.js"
import allpublication from "./routes/allPubliactions.js"
import registerRouter from "./routes/register.js"
import searchUserRouter from "./routes/searchUser.js"
import showPublication from "./routes/showPublication.js"
import unfollowing from "./routes/unfollowing.js"
import deletePub from "./routes/deletePub.js"
import userRouter from "./routes/user.js"

import mongoose from 'mongoose'
import router from './routes/routes.js'

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
  ////////////////////////////////////////// MEJORAR //////////////////////////////////////
  let header = {}
  if ((typeof req.headers.authorization === 'undefined') && (req.method === 'POST')){
    header = req.body.headers.authorization
  } else if (req.method === 'POST') {
    header = req.headers.authorization
  } else {
    header = req.header('authorization')
  }
  ////////////////////////////////////////// MEJORAR //////////////////////////////////////
  //const header = req.method === 'POST' ? req.body.headers.authorization : req.header('authorization')
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]
    console.log(`\nValor del token => ${token}`)
    await jwt.verify(token, process.env.TOKEN_SECRET, async (err) => {
      if (err) {
        res.status(401).json({ error: 'token no es válido' })
      } else {
        await next();
      }
    })
  } else {
    // console.log(req)
    return res.status(401).json({ error: 'Acceso denegado' })
  }
}


app.use('/api', loginRouter, registerRouter)
app.use(verifyToken)

//El orden en el que se pongan los modulos, importa
// OJO a la hora de colocarlos
app.use('/api', deletePub, unfollowing, allpublication, checkfollow, showPublication, publicationRouter, searchUserRouter, following, userRouter, router)

app.listen(process.env.PORT, () => {
  console.log('The API is listening at port', process.env.PORT)
})


export default app
