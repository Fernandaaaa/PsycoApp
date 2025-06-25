import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/pacientes', async (req, res) => {
    const pacientes = await User.find({ tipoUsuario: 'paciente' });
    res.status(200).json(pacientes);
});

export default router;