import express from "express";

import User from "../models/registerModel.js";

const router = express.Router();

router.get('/getPublications/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // Buscar el usuario por el nombre de usuario
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
      });
    }

    // Devolver la información del usuario
    res.status(200).json({
      error: null,
      message: 'Usuario encontrado',
      publications: user.publications
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

export default router;

