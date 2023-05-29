import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';
import Customer from './Customer.js';
import Employee from './Employee.js';

const Chat = sequelize.define(
  'Chat',
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
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'chat',
  },
);

Chat.belongsTo(Customer, { foreignKey: 'customer_id' });
Chat.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Chat;
