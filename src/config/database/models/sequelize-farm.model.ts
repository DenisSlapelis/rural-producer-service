import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';

export interface FarmDB extends Model<InferAttributes<FarmDB>, InferCreationAttributes<FarmDB>> {
    id: CreationOptional<number>;
    name: string;
    city: string;
    state: string;
    agriculturalArea: number;
    vegetationArea: number;
    totalArea: number;
}

export const FarmDBProps = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    agriculturalArea: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vegetationArea: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalArea: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
};
