import express from "express";

import User from "../models/registerModel.js";

const router = express.Router();

router.post('/unfollowing/:username/:finduser', async (req, res) => {
  const user = req.params.username;
  const userfollow = req.params.finduser;

  // console.log(userfollow);
  if (!userfollow) {
    return res.status(400).json({ error: "El campo 'username' es requerido" });
  }

  try {
    const usernameAnswer = await User.findOne({ username: user }).exec();
    const finduserAnswer = await User.findOne({ username: userfollow }).exec();

    const checkUser = await User.findOne({ "followsUser.username": userfollow }).exec();

    const checkfollower = await User.findOne({ "followersUser.username": user }).exec();

    console.log('hi', finduserAnswer);
    console.log('check', checkUser);

    if (!usernameAnswer || !finduserAnswer) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    if (checkUser && checkfollower) {
      // Eliminar el usuario de la lista de seguidos
      usernameAnswer.followsUser.pull({ username: userfollow });
      finduserAnswer.followersUser.pull({ username: user });



      // Incrementar propiedad follows del usuario username
      if (usernameAnswer.followers > -1) {
        usernameAnswer.followers -= 1;
      }

      // Incrementar propiedad followers del usuario finduser
      if (finduserAnswer.follows > -1) {
        finduserAnswer.follows -= 1;
      }

      await usernameAnswer.save();
      await finduserAnswer.save();

      return res.status(200).json({
        error: null,
        message: 'Usuario eliminado de seguidos',
        publication: req.body.message
      });
    }

    return res.status(400).json({ error: "Usuario no siguiendo" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor_" });
  }
});

export default router;