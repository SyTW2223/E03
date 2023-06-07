import express from "express";

// import Joi from "@hapi/joi";
import User from "../models/registerModel.js";

// const schemaUser = Joi.object({
//   username: Joi.string().required(),
// });

const router = express.Router();

router.get('/getUser/:username', async (req, res) => {
  console.log('Ruta getUser llamada');
  try {
    const username = req.params.username;
    console.log(username)

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
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
        follows: user.follows,
        followers: user.followers,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

export default router;


