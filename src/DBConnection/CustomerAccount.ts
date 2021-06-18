import { DataTypes } from 'sequelize';

const defineAccountModel: defineTableModel = (sequelize) => {
    const accountModel = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        customerFirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerLastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    };
    const modelOptions = {
        sequelize,
        modelName: 'CustomerAccount',
        tableName: 'CustomerAccount',
    }

   return sequelize.define('CustomerAccount',accountModel,modelOptions);
};

export default defineAccountModel;

