import express from "express"

import User from "../models/loginModel.js"
import Joi from "@hapi/joi"
import bcrypt from "bcrypt"

const schemaLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})


const router = express.Router()

// Ruta para hacer login
router.post('/login', async (req, res) => {
  
  // Validar los datos que obtenemos en el body del request
  const { error } = schemaLogin.validate(req.body)

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    })
  }

  const data = new User({
    username: req.body.username,
    password: req.body.password,
  })
  // En caso de que la BBDD no este ON, salta el catch y lanzamos el error (10s)
  try {
    const respuesta = await User.findOne({username: data.username}).exec()
    // Si no se encuentra el usuario por el username
    if (respuesta == null) return res.status(400).json({message: "Usuario no encontrado"})

    const validPassword = await bcrypt.compare(req.body.password, User.password)
    // Si la password no es igual a la del usuario guardada en la BBDD
    if (!validPassword) return res.status(400).json({message: "Password invalida"})

    res.status(200).json(respuesta)
  } catch(error) {
    res.status(400).json({message: error.message})
  }
})

export default router