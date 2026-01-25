import express from 'express';
const router = express.Router();
import { getAllBarbers, getBarberById } from '../controllers/barberController.js';

router.get('/', getAllBarbers);
router.get('/:id', getBarberById);

export default router;
