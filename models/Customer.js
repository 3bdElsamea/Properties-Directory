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
<<<<<<< HEAD
      defaultValue: '',
=======
      // defaultValue: '',
      // validate: {
      //   is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
      // },
>>>>>>> 7a1fcf3b593846d7e6b4cf0043f72b4b07c8f8b9
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: '',
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      // defaultValue: '',
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
      beforeUpdate: async (customer) => {
        if (customer.changed('password')) {
          const salt = await bcrypt.genSaltSync(10);
          customer.password = bcrypt.hashSync(customer.password, salt);
        }
      },
    },
  },
);

export default Customer;
