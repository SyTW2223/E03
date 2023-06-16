import express from "express";

import User from "../models/registerModel.js";

const router = express.Router()

router.post('/following/:username/:finduser', async (req, res) => {
  const user = req.params.username;
  const userfollow = req.params.finduser;

  if (!userfollow) {
    return res.status(400).json({ error: "El campo 'username' es requerido" });
  }

  try {
    const usernameAnswer = await User.findOne({ username: user }).exec();
    const finduserAnswer = await User.findOne({ username: userfollow }).exec();

    const checkUser = await User.findOne({ "follows.username": userfollow }).exec();

    if (!usernameAnswer || !finduserAnswer) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    if (checkUser != null) {
      return res.status(400).json({ error: "Usuario ya siguiendo" });
    }

    usernameAnswer.follows.push({
      username: userfollow
    });

    finduserAnswer.followers.push({
      username: user
    });

    await usernameAnswer.save();
    await finduserAnswer.save();

    return res.status(200).json({
      error: null,
      message: 'Usuario agregado a seguidos',
      publication: req.body.message
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router