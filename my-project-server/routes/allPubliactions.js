import express from "express";

import User from "../models/registerModel.js";

const router = express.Router();

router.get('/getAllPublications', async (req, res) => {
  try {
    // Obtener todas las publicaciones de todos los usuarios
    const users = await User.find({}, 'publications').exec();

    // Crear un arreglo para almacenar todas las publicaciones
    const allPublications = [];

    // Recorrer cada usuario y agregar sus publicaciones al arreglo
    users.forEach(user => {
      // const { name, publications } = user;
      // // Agregar un objeto con el nombre del usuario y sus publicaciones al arreglo
      // allPublications.push({ name, publications });
      const { publications } = user;
      // Agregar un objeto con el nombre del usuario y sus publicaciones al arreglo
      // console.log(publications.publications)
      if (publications.length > 0) {
        allPublications.push(publications);
      }
    });
    console.log(allPublications)

    // Devolver todas las publicaciones
    res.status(200).json({
      error: null,
      message: 'Todas las publicaciones',
      publications: allPublications
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

export default router;
