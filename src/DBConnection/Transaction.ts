import { DataTypes } from 'sequelize';

const defineTransactionModel: defineTableModel = (sequelize) => {
    const transactionModel = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
         originAccountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destinyAccountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transferredAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };
    const modelOptions = {
        modelName: 'Transaction',
        tableName: 'Transaction',
    }
   return sequelize.define('Transaction', transactionModel,modelOptions);
};


export default defineTransactionModel;
