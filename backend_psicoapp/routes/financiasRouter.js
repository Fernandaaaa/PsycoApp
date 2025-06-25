import express from 'express';
import { getByPsicologo, getByPaciente } from '../controllers/financiasController.js';

const router = express.Router();

router.get('/:id', getByPsicologo);
router.get('/paciente/:id', getByPaciente);

export default router;