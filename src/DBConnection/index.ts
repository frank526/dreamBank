import { Sequelize, Options } from 'sequelize';
import defineUserModel from './User';
import defineRequestedBankProductModel from './RequestedBankProduct';
import defineAccountModel from './CustomerAccount';
import defineTransactionModel from './Transaction';
import config from '../config';
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_SHOW_LOGS } = config;

const options: Options = {
    host: DB_HOST,
    dialect: 'mysql',
    logging: DB_SHOW_LOGS,
};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, options);

const db = {
    sequelize,
    User: defineUserModel(sequelize),
    RequestedBankProduct: defineRequestedBankProductModel(sequelize),
    CustomerAccount: defineAccountModel(sequelize),
    Transaction: defineTransactionModel(sequelize),
};

// Define relationship
db.User.hasMany(db.RequestedBankProduct, { foreignKey: 'userId' });
db.RequestedBankProduct.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.CustomerAccount, { foreignKey: 'userId' });
db.CustomerAccount.belongsTo(db.User, { foreignKey: 'userId' });


db.sequelize.sync();

export default db;
