import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import Customer from './Customer.js';
import Property from './Property.js';

const PropertyGeneralRequest = sequelize.define(
  'PropertyGeneralRequest',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    tableName: 'property_general_requests',
  },
);

PropertyGeneralRequest.belongsTo(Customer, { foreignKey: 'customer_id' });
PropertyGeneralRequest.belongsTo(Property, { foreignKey: 'property_id' });

export default PropertyGeneralRequest;
