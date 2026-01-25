import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Neon database configuration with SSL support
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false // Required for Neon
        } : false
    },
    define: {
        timestamps: true,
        underscored: true,
    },
});

export default sequelize;
