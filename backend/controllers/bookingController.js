import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
    try {
        const { name, phone, serviceId, barberId, date, time } = req.body;

        // Validation: Check if time slot is already taken
        const existing = await Booking.findOne({ where: { date, time, barber_id: barberId } });
        if (existing && barberId !== 'any') {
            return res.status(400).json({ message: 'This time slot is already booked.' });
        }

        const booking = await Booking.create({
            customer_name: name,
            customer_phone: phone,
            service_id: serviceId,
            barber_id: barberId,
            date,
            time,
            status: 'pending'
        });

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            order: [['date', 'DESC'], ['time', 'ASC']]
        });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const booking = await Booking.findByPk(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        booking.status = status;
        await booking.save();
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};