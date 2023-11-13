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
            allowNull: false,
        },
        nome_mae: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inscricao_municipal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inscricao_estadual: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'pessoas',
        sequelize,
    }
);

const options = { tableName: 'pessoas', sequelize };




/** nome
Texto
Não
Nome do cliente.
identificacao
Texto
Não
Número de identificação do cliente.(CNPJ/CPF)
nome_fantasia
Texto
Sim
Nome fantasia da empresa.
nome_mae
Texto
Sim
Nome da mãe do cliente
inscrição_municipal
Texto
Sim
Inscrição municipal da empresa.
inscrição_estadual
Texto
Sim
Inscrição estadual da empresa.

 */


