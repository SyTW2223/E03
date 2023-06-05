import express from "express"
import database from "../index.js"

import User from "../models/registerModel.js"
import Joi from "@hapi/joi"

const schemaTweet = Joi.object({
  username: Joi.string().required(),
  message: Joi.string().required()
})


const router = express.Router()

router.post('/tweet', async (req, res) => {
    const { error } = schemaTweet.validate(req.body)

    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      })
    }

    const respuesta = await User.findOne({username: req.body.username}).exec()
    if (!respuesta) return res.status(400).json({error: "Usuario no encontrado"})
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    respuesta.tweets.push({
        message: req.body.message,
        date: hoy.toLocaleDateString()
    })
    respuesta.save()
    res.status(200).json({
        error: null,
        message: 'Tweet enviado con exito',
        tweet: req.body.message
    })
})

export default router