import express from "express"

import User from "../models/registerModel.js"
import Joi from "@hapi/joi"
import bcrypt from "bcrypt"

const schemaRegister = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})

const router = express.Router()

router.post('/register', async (req, res) => {
  const {error} = schemaRegister.validate(req.body)
  if (error) return res.status(400).json({
    error: error.details[0].message
  })

  const isEmailExist = await User.findOne({ email: req.body.email })
  if (isEmailExist) return res.status(400).json({error: 'Email ya registrado'})
  
  const isUsernameExist = await User.findOne({username: req.body.username})
  if (isUsernameExist) return res.status(400).json({error: 'Nombre de usuario ya registrado'})
  
  const data = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    follows: 0,
    followers: 0
  })

  try {
    const savedUser = await data.save()
    res.status(200).json(savedUser)
  } catch(error) {
    res.status(400).json({message: error.message})
  }
})

export default router