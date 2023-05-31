import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import Customer from './Customer.js';
import Employee from './Employee.js';

const Report = sequelize.define(
  'Report',
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
    action: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'reports',
  },
);

Report.belongsTo(Customer, { foreignKey: 'customer_id' });
Report.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Report;
