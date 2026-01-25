import express from 'express';
const router = express.Router();
import { getAllServices } from '../controllers/serviceController.js';

router.get('/', getAllServices);

export default router;