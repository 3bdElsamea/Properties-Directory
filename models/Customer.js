import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';

const Customer = sequelize.define(
  'Customer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      defaultValue: '',
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      // validate: {
      //   is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
      // },
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: '',
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      defaultValue: '',
    },
    password_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password_token_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'customers',
  },
);

export default Customer;