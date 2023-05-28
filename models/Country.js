import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection';

const Country = sequelize.define(
  'Country',
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
    tableName: 'countries',
  },
);

export default Country;
