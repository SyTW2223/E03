import express from "express";
import User from "../models/registerModel.js";

const router = express.Router()

router.get('/getAllPublications/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    // Encontrar el usuario basado en el nombre de usuario proporcionado
    const user = await User.findOne({ username }).exec();
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
      });
    }
    
    const followers = user.follows.map(follower => follower.username);
    
    // Encontrar las publicaciones de los usuarios seguidos
    const publications = await User.find({ username: { $in: followers } }, 'publications')
    .exec();

    // Crear un arreglo para almacenar todas las publicaciones
    const allPublications = publications.flatMap(user => user.publications);

    // Devolver todas las publicaciones
    res.status(200).json({
      error: null,
      message: 'Publicaciones de los usuarios seguidos',
      publications: allPublications,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

export default router;
