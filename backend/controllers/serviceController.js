import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};