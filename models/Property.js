import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import Category from './Category.js';
import City from './City.js';
import PropertyType from './PropertyType.js';
import Owner from './Owner.js';
import Employee from './Employee.js';

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
      type: DataTypes.ENUM('pending', 'active', 'rejected'),
      defaultValue: 'pending',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    property_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'properties',
  },
);

Property.belongsTo(Category, { foreignKey: 'category_id' });
Property.belongsTo(City, { foreignKey: 'city_id' });
Property.belongsTo(PropertyType, { foreignKey: 'property_type_id' });
Property.belongsTo(Owner, { foreignKey: 'owner_id' });
Property.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Property;
