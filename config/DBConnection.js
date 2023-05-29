import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(
  'postgresql://ahmedelshaar:rLiTXWeNZ5b4@ep-solitary-morning-295039.eu-central-1.aws.neon.tech/neondb?sslmode=require',
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


