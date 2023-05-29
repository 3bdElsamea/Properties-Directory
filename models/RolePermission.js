import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';
import Role from './Role.js';
import Permission from './Permission.js';

const RolePermission = sequelize.define(
  'RolePermission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'role_permissions',
  },
);

RolePermission.belongsTo(Role, { foreignKey: 'role_id' });
RolePermission.belongsTo(Permission, { foreignKey: 'permission_id' });

export default RolePermission;
