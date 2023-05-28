import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const PropertyType = sequelize.define(
  'PropertyType',
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
  },
  {
    tableName: 'property_types',
  },
);

export default PropertyType;
