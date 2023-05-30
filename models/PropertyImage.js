import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';

const PropertyImage = sequelize.define(
  'PropertyImage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'property_images',
  },
);

PropertyImage.belongsTo(Property, { foreignKey: 'property_id' });

export default PropertyImage;
