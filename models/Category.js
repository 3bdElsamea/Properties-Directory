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

Category.prototype.toggleActive = async function () {
  this.active = this.active === 1 ? 0 : 1;
  await this.save();
};

export default Category;
