//Imports
import { Sequelize , DataType} from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL);

//Define a model
const Customer = sequelize.define('customer', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {},
    image: {},
    phone: {},
    password_token: {},
    password_token_expires_at: {},
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Customer;