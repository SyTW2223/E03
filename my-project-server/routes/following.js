import express from "express"
import database from "../index.js"

import User from "../models/registerModel.js"
import Joi from "@hapi/joi"


const router = express.Router()

router.post('/following/:username', async (req, res) => {
  // Obtener el valor de `username` desde los parámetros de la URL
  const username = req.params.username; 
  
  const answer = await User.findOne({ username }).exec()
  if (!answer) return res.status(400).json({ error: "Usuario no encontrado" })

  answer.followsUser.push({
    username: req.body.username
  })
  answer.save()
  res.status(200).json({
    error: null,
    message: 'Usuario agregado a seguidos',
    publication: req.body.message
  })
})

export default router