import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const ContactUs = sequelize.define(
  'ContactUs',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'rejected'),
      defaultValue: 'pending',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'contact_us',
  },
);

export default ContactUs;
