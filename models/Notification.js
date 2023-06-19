import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import Customer from './Customer.js';
import Employee from './Employee.js';

const Notification = sequelize.define(
  'Notification',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
  },
  {
    tableName: 'notifications',
  },
);

Notification.belongsTo(Customer, { foreignKey: 'customer_id' });

export default Notification;
