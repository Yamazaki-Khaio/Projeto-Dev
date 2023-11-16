import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';

class Telefone extends Model {
    public id!: number;
    public telefone!: string;
    public isPrimary!: boolean;
}

Telefone.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'telefones',
});
