import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const EmployeeRole = sequelize.define(
  'EmployeeRole',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'employee_roles',
  },
);

EmployeeRole.belongsTo(Employee, { foreignKey: 'employee_id' });
EmployeeRole.belongsTo(Role, { foreignKey: 'role_id' });

export default EmployeeRole;
