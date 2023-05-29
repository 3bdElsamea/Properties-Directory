import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import appError from '../utils/appError.js';

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
    hooks: {
      beforeUpdate: async (country) => {
        if (country.active) {
          throw new appError('You can not update country to inactive', 400);
        }
      },
    },
  },
);

// Toggle active
Country.prototype.toggleActive = async function () {
  this.active = this.active === 1 ? 0 : 1;
  await this.save();
};

export default Country;
