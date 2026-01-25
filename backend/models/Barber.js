import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Barber = sequelize.define('Barber', {
    id: {
        type: DataTypes.STRING, // Using string as ID based on constants.tsx
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
});

export default Barber;