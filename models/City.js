import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import Country from './Country.js';

const City = sequelize.define(
  'City',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   Reference Country.id
      references: {
        model: Country,
        key: 'id',
      },
    },
  },
  {
    tableName: 'cities',
  },
);

City.belongsTo(Country, {
  foreignKey: 'country_id',
  as: 'country',
});

export default City;
