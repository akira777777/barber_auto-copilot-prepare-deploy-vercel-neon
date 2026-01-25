import Barber from '../models/Barber.js';

export const getAllBarbers = async (req, res) => {
    try {
        const barbers = await Barber.findAll({
            order: [['id', 'ASC']],
        });
        res.json(barbers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getBarberById = async (req, res) => {
    try {
        const { id } = req.params;
        const barber = await Barber.findByPk(id);
        if (!barber) return res.status(404).json({ message: 'Barber not found' });
        res.json(barber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
