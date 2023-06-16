import express from "express"

import Joi from "@hapi/joi"
import bcrypt from "bcrypt"
import User from "../models/registerModel.js"

const schemaRegister = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})

const router = express.Router()

router.post('/register', async (req, res) => {

  //Validacion de los datos enviados
  const { error } = schemaRegister.validate(req.body)
  if (error) return res.status(400).json({
    error: error.details[0].message
  })

  //Casos en los que tengamos EMAIL o USERNAME ya en la BBDD
  const isEmailExist = await User.findOne({ email: req.body.email })
  if (isEmailExist) return res.status(400).json({ error: 'Email ya registrado' })

  const isUsernameExist = await User.findOne({ username: req.body.username })
  if (isUsernameExist) return res.status(400).json({ error: 'Nombre de usuario ya registrado' })

  //Salt = bit aleatorios
  const salt = await bcrypt.genSalt(10);
  //Hasheamos la password del usuairo
  const password = await bcrypt.hash(req.body.password, salt);

  //Creamos el nuevo usuario
  const data = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: password,
    follows: [],
    followers: []
  })

  //Tratamos de guardar el usuario en la BBDD
  try {
    const savedUser = await data.save()
    res.status(200).json({
      message: 'Usuario creado con exito',
    })
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

export default router