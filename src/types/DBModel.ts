import { Sequelize, ModelCtor, Model } from 'sequelize';

declare global {
    type defineTableModel = (sequelize: Sequelize) => ModelCtor<Model<any, any>>
}

