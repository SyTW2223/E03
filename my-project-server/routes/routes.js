import express from 'express'

const router = express.Router()

// En caso de acceder a una ruta no creada
router.all('*', (req, res) => {
  res.status(404).json({
    "message": "Ruta no encontrada"
  })
  console.log("Intento de acceso a la ruta", decodeURI(req.url))
})

export default router
