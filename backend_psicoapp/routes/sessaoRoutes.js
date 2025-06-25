import express from 'express';
import { create, getByPaciente, update, cancel, completeSession } from '../controllers/sessaoController.js';

const router = express.Router();

router.post('/create', create);
router.get('/paciente/:id', getByPaciente);
router.put('/update/:id', update);
router.delete('/cancel/:id', cancel);
router.put('/complete/:id', completeSession);

export default router;