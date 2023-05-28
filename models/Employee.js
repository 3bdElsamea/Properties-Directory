import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const Employee = sequelize.define(
  'Employee',
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    blocked: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    password_token: {
      type: DataTypes.STRING(255),
    },
    password_token_expires_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'employees',
  },
);

export default Employee;
