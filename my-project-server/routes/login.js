import express from "express"

import Model from "../models/loginModel.js"

const router = express.Router()

// Ruta para hacer login
router.post('/login', async (req, res) => {
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