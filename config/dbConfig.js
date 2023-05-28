import { Sequelize } from 'sequelize';
// import sequelize from "./database.js";
const connectDB = async () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default connectDB;
