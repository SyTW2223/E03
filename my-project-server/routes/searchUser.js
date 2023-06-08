import express from "express"

import User from "../models/registerModel.js"

const router = express.Router()

router.get('/searchUser/:username', async (req, res) => {
    const username = req.params.username
    const respuesta = await User.find({username: {$regex: '^' + username} }).exec()
    var data = respuesta.map(tmp => tmp.username)
    res.status(200).json({
      error: null,
      message: 'usuarios encontrados ' + respuesta.length,
      username: data
  })
})

export default router