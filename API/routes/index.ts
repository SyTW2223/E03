import { Router } from 'express';
import db from '../models/db';
import {Usuario} from '../models/user';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hellow world');
})

router.get('/getUsers', async (req, res) => {
    const usuarios = await db.find();
    res.send(usuarios);
    console.log('Obteniendo todos los usuarios');
})

router.post('/loginUser', async (req, res) => {
    console.log("Usuario logueado")
    try {
        const usuario = await Usuario.find({mail: req.body.mail, password: req.body.password})
        if (usuario.length == 0) {
            return res.status(404).send({error: 'Usuario no encontrado, contraseña o correo mal no son los indicados'});
        }
        return res.status(200).send(usuario)
    } catch(error) {
        return res.status(400).send(error);
    }
})

router.post('/registerUser', async (req, res) => {
    const usuario = new Usuario(req.body);
    console.log('Registrando Usuario' + usuario);
    try {
        await usuario.save();
        return res.status(201).send(usuario);
      } catch (error) {
        return res.status(400).send(error);
      }
})


export default router;