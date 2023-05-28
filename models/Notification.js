import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

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
    employee_id: {
      type: DataTypes.INTEGER,
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
Notification.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Notification;
