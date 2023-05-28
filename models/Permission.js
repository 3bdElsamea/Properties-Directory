import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const Permission = sequelize.define(
  'Permission',
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
    tableName: 'permissions',
  },
);

export default Permission;
