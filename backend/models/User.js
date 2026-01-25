import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'staff'),
        defaultValue: 'admin',
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password_hash && !user.password_hash.startsWith('$2a$')) {
                user.password_hash = await bcrypt.hash(user.password_hash, 10);
            }
        },
    },
});

User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password_hash);
};

export default User;
