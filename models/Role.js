import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import RolePermission from './RolePermission.js';

const Role = sequelize.define(
  'Role',
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
  },
  {
    tableName: 'roles',
  },
);

Role.hasMany(RolePermission, { foreignKey: 'role_id' });

export default Role;
