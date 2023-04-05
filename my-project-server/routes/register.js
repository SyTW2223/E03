import express from "express"

import User from "../models/registerModel.js"
import Joi from "@hapi/joi"
import bcrypt from "bcrypt"

const schemaRegister = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})

const router = express.Router()

router.post('/register', async (req, res) => {
  const {error} = schemaRegister.validate(req.body)
  if (error) return res.status(400).json({
    error: error.details[0].message
  })

  const data = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  try {
    const savedUser = await data.save()
    res.status(200).json(savedUser)
  } catch(error) {
    res.status(400).json({message: error.message})
  }
})

export default router