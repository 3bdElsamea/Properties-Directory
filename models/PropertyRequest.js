import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const PropertyRequest = sequelize.define(
  'PropertyRequest',
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
    status: {
      type: DataTypes.ENUM('pending', 'active', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'property_requests',
  },
);

PropertyRequest.belongsTo(Customer, { foreignKey: 'customer_id' });
PropertyRequest.belongsTo(Property, { foreignKey: 'property_id' });

export default PropertyRequest;
