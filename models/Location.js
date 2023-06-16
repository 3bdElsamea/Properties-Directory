// import { DataTypes } from 'sequelize';
// import sequelize from '../config/DBConnection.js';
// import City from './City.js';
// import Country from './Country.js';
// import Property from './Property.js';
//
// const Location = sequelize.define(
//   'Location',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     street: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     building_no: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     floor: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     flat_no: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     map_link: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     city_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     country_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     property_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'location',
//   },
// );
//
// Location.belongsTo(City, { foreignKey: 'city_id' });
// Location.belongsTo(Country, { foreignKey: 'country_id' });
// // Location.belongsTo(Property, { foreignKey: 'property_id' });
//
// export default Location;
