import express from "express"
import database from "../index.js"

import User from "../models/registerModel.js"
import Joi from "@hapi/joi"

const schemapublication = Joi.object({
  username: Joi.string().required(),
  message: Joi.string().required()
})


const router = express.Router()

router.post('/publication', async (req, res) => {
    const { error } = schemapublication.validate(req.body)
    
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      })
    }

    const respuesta = await User.findOne({username: req.body.username}).exec()
    if (!respuesta) return res.status(400).json({error: "Usuario no encontrado"})

    // const tiempoTranscurrido = Date.now();

    // const hoy = new Date(tiempoTranscurrido);

    respuesta.publications.push({
        message: req.body.message,
        // date: hoy.toLocaleDateString()
        date: Date.now()
    })
    respuesta.save()
    res.status(200).json({
        error: null,
        message: 'publication enviado con exito',
        publication: req.body.message
    })
})

export default router