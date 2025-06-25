import express from 'express';
import { addFeedback, getByUser } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/add', addFeedback);
router.get('/paciente/:id', getByUser);

export default router;