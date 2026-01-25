import express from 'express';
const router = express.Router();
import { createBooking, getAllBookings, updateBookingStatus } from '../controllers/bookingController.js';

router.post('/', createBooking);
router.get('/', getAllBookings);
router.patch('/:id', updateBookingStatus);

export default router;