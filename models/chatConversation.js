import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import Customer from './Customer.js';
import Employee from './Employee.js';

const ChatConversation = sequelize.define('chat_conversation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  }
}, {
  timestamps: false // Disable timestamps for this table
});

ChatConversation.belongsTo(Customer, { foreignKey: 'customer_id' });
ChatConversation.belongsTo(Employee, { foreignKey: 'employee_id' });

export default ChatConversation;
