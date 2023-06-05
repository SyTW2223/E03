import express from "express"
import database from "../index.js"

import User from "../models/registerModel.js"
import Joi from "@hapi/joi"

const schemaUser = Joi.object({
  username: Joi.string().required(),
})


const router = express.Router()

router.post('/searchUser', async (req, res) => {
    console.log(req.body)
    const { error } = schemaUser.validate(req.body)

    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      })
    }
    const respuesta = await User.find({username: {$regex: '^' + req.body.username} }).exec()
    var data = respuesta.map(tmp => tmp.username)
    res.status(200).json({
      error: null,
      message: 'usuarios encontrados ' + respuesta.length,
      username: data
  })
})

export default router