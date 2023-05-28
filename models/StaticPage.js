import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const StaticPage = sequelize.define(
  'StaticPage',
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'static_pages',
  },
);

export default StaticPage;
