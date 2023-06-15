import express from "express";
import { ObjectId } from "mongodb";
import User from "../models/registerModel.js";

const router = express.Router();

router.delete('/deletePub/:publicationId', async (req, res) => {
  // Obtener el ID de la publicación a eliminar de los parámetros de la solicitud
  const { publicationId } = req.params;

  try {
    // Convertir el ID de la publicación a un objeto ObjectId válido
    const objectId = new ObjectId(publicationId);

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      // Si el usuario no existe, devolver un error
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Filtrar y eliminar la publicación del usuario
    if (user.publications.length > 0) {
      // Filtrar y eliminar la publicación del usuario
      user.publications = user.publications.filter(
        publication =>
          publication._id && publication._id.toString() !== objectId.toString()
      );
    }
    // Guardar los cambios en la base de datos
    await user.save();

    res.status(200).json({
      error: null,
      message: 'Publicación eliminada con éxito',
      // Devolver el ID de la publicación eliminada en la respuesta
      publicationId: publicationId
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' }); // Si ocurre un error en el servidor, devolver un error
  }
});

export default router;
