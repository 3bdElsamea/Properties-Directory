import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';

const Category = sequelize.define(
  'Category',
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
    active: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
  },
  {
    tableName: 'categories',
  },
);

export default Category;
