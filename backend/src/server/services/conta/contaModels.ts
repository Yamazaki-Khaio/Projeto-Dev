import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';


class Conta extends Model {
    public id!: number;
    public email!: string;
    public nome!: string;
    public senha!: string;
}

Conta.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                isEmail: true,
            },
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: 'Conta',
        sequelize,
    }
);



export default Conta;
