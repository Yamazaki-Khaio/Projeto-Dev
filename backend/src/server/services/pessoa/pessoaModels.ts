import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/sequelize';


export default class Pessoa extends Model {
    public id!: number;
    public nome!: string;
    public identificacao!: string;
    public nome_fantasia!: string;
    public nome_mae!: string;
    public inscricao_municipal!: string;
    public inscricao_estadual!: string;
}

Pessoa.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identificacao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome_fantasia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nome_mae: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inscricao_municipal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inscricao_estadual: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'pessoas',
        sequelize,
    }
);




