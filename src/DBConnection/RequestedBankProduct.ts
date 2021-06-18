import { DataTypes } from 'sequelize';

const defineRequestedBankProductModel: defineTableModel = (sequelize) => {
    const requestedBankProductModel = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        productBank: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    };
    const modelOptions = {
        modelName: 'RequestedBankProduct',
        tableName: 'RequestedBankProduct',
    }
   return sequelize.define('RequestedBankProduct',requestedBankProductModel,modelOptions);
};


export default defineRequestedBankProductModel;
