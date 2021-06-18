import { DataTypes } from 'sequelize';

const defineUserModel: defineTableModel = (sequelize) => {
    const userModel = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identificationCard: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            
        }
    };
    const modelOptions = {
        modelName: 'User',
        tableName: 'User',
    }
   return sequelize.define('User',userModel,modelOptions);
};


export default defineUserModel;
