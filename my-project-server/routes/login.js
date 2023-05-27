import express from "express"
import database from "../index.js"

import User from "../models/registerModel.js"
import Joi from "@hapi/joi"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const schemaLogin = Joi.object({
  email: Joi.string().required(),
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

  // En caso de que la BBDD no este ON, salta el catch y lanzamos el error (10s)
  try {

    const respuesta = await User.findOne({email: req.body.email}).exec()
    // Si no se encuentra el usuario por el username
    if (!respuesta) return res.status(400).json({error: "Usuario no encontrado"})

    const validPassword = await bcrypt.compare(req.body.password, respuesta.password)
    //Si la password no es igual a la del usuario guardada en la BBDD
    if (!validPassword) return res.status(400).json({error: "Password invalida"})
    
    //Creamos el token con 2h de validez
    const token = jwt.sign({
      email: req.body.email,
      password: req.body.password
    }, process.env.TOKEN_SECRET, {expiresIn: '2h', allowInsecureKeySizes: true})

    res.status(200).header('auth-token', token).json({
      error: null,
      data: {token}
    })
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

export default router