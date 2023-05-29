import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import bcrypt from 'bcrypt';

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
    hooks: {
      beforeCreate: async (employee) => {
        if (employee.password) {
          const salt = await bcrypt.genSaltSync(10);
          employee.password = bcrypt.hashSync(employee.password, salt);
        }
      },
      beforeUpdate:async (employee) => {
        if (employee.password) {
          const salt = await bcrypt.genSaltSync(10);
          employee.password = bcrypt.hashSync(employee.password, salt);
        }
      }
    }
  },
);

export default Employee;
