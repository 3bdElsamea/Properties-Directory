import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import bcrypt from 'bcrypt';

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
      validate: {
        is: /^[a-zA-Z ]{2,30}$/i,
        length(value) {
          if (value.length < 2 || value.length > 30) {
            throw new Error('Name must be between 2 and 30 characters');
          }
        },
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(50),
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
    hooks: {
      beforeCreate: async (customer) => {
        if (customer.password) {
          const salt = await bcrypt.genSaltSync(10);
          customer.password = bcrypt.hashSync(customer.password, salt);
        }
      },
      beforeUpdate:async (customer) => {
        if (customer.password) {
          const salt = await bcrypt.genSaltSync(10);
          customer.password = bcrypt.hashSync(customer.password, salt);
        }
      }
    }
  },
);

export default Customer;
