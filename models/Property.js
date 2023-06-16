import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import Category from './Category.js';
import City from './City.js';
import Owner from './Owner.js';
import Employee from './Employee.js';
import PropertyImage from './PropertyImage.js';

const Property = sequelize.define(
  'Property',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    garage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_built: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'properties',
  },
);

Property.hasMany(PropertyImage, { foreignKey: 'property_id' });

Property.belongsTo(Category, { foreignKey: 'category_id' });
Property.belongsTo(City, { foreignKey: 'city_id' });
Property.belongsTo(Owner, { foreignKey: 'owner_id' });
Property.belongsTo(Employee, { foreignKey: 'employee_id' });
Property.hasMany(PropertyImage, { foreignKey: 'property_id' });

export default Property;
