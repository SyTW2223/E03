import express from "express"

import Model from "../models/loginModel.js"
import Joi from "@hapi/joi"

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
  const data = new Model({
    username: req.body.username,
    password: req.body.password,
  })
  // En caso de que la BBDD no este ON, salta el catch y lanzamos el error (10s)
  try {
    const respuesta = await Model.findOne(data).exec()
    if (respuesta != null) {
      
    }
    res.status(200).json(respuesta)
  } catch(error) {
    res.status(400).json({message: error.message})
  }
})

export default router