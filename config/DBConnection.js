import Sequelize from 'sequelize';
import { config } from 'dotenv';
import catchAsync from '../utils/catchAsync.js';

config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

// connect use async await with catchAsync
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
export default sequelize;
